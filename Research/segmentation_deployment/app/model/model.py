import json
import os
import time
import shutil
import sys
import nibabel
import numpy as np
from glob import glob
import subprocess 



# function to load nifty files and return the data
# input: dir_path : path to the directory containing the nifty files
#        dir_name : name of the directory containing the nifty files (same as the file name)
#        suffix : suffix of the nifty file
# output: nifty file data
def load_nifty(dir_path, dir_name, suffix):
    print("load_nifty")
    file_name = dir_name + "_" + suffix + ".nii.gz"
    print("from load nifty",  file_name)

    # print(dir_path)
    print(os.path.join(dir_path, file_name))
    return nibabel.load(os.path.join(dir_path, file_name))


# function to load the sequences (flair, t1, t1ce, t2)
# input: dir_path : path to the directory containing the nifty files
#        dir_name : name of the directory containing the nifty files (same as the file name)
# output: list of nifty files data
def load_sequences(dir_path, dir_name):
    print("load_sequences")
    return [load_nifty(dir_path, dir_name, suffix) for suffix in ["flair", "t1", "t1ce", "t2"]]


# function to get the data from the nifty file
# input: nifty : nifty file data
#        dtype : data type of the nifty file
# output: nifty file data
def get_data(nifty, dtype="int16"):
    print("get_data")
    if dtype == "int16":
        data = np.abs(nifty.get_fdata().astype(np.int16))
        data[data == -32768] = 0
        return data
    return nifty.get_fdata().astype(np.uint8)


# function to prepare the nifty files
# input: dir_path : path to the directory containing the nifty files
# output: nifty file data
def prepare_nifty(dir_path):
    print("prepare_nifty")

    # get the directory name from the path (same as the file name)
    dir_name = dir_path.split('/')[-1]


    flair, t1, t1ce, t2 = load_sequences(dir_path, dir_name)

    # get the affine and header from the t1 file
    affine, header = t1.affine, t1.header

    # stack the sequences together in one volume and save it
    vol = np.stack([get_data(flair), get_data(t1), get_data(t1ce), get_data(t2)], axis=-1)
    vol = nibabel.nifti1.Nifti1Image(vol, affine, header=header)
    nibabel.save(vol, os.path.join(dir_path, dir_name + ".nii.gz"))

    # if the segmentation file exists, load it and save it with change in [ 4 -> 3]
    if os.path.exists(os.path.join(dir_path, dir_name + "_seg.nii.gz")):
        seg = load_nifty(dir_path, dir_name, "seg")
        affine, header = seg.affine, seg.header
        vol = get_data(seg, "unit8")
        vol[vol == 4] = 3
        seg = nibabel.nifti1.Nifti1Image(vol, affine, header=header)
        nibabel.save(seg, os.path.join(dir_path, dir_name + "_seg.nii.gz"))


# function to prepare the directories
# input: dir_path : path to the directory containing the nifty files
#        isTrain : boolean to indicate if the data is for training or testing
# output: nifty file data
def prepare_dirs(dir_path, isTrain):
    print("prepare_dirs")

    # create the images and labels directories
    img_path = os.path.join(os.path.dirname(dir_path), "images")
    label_path = os.path.join(os.path.dirname(dir_path), "labels")

    os.makedirs(img_path, exist_ok=True)

    if isTrain:
        os.makedirs(label_path, exist_ok=True)

    # get all the nifty files in the directory
    files = glob(os.path.join(dir_path, "*.nii.gz"))

    # move the files to the images and labels directories then remove the directory
    for file in files:

        if "flair" in file or "t1" in file or "t1ce" in file or "t2" in file:
            continue

        if "_seg" in file:
            shutil.move(file, label_path)

        else:
            shutil.move(file, img_path)

    shutil.rmtree(dir_path)


# function to prepare the dataset json file
# input: dir_path : path to the directory containing the nifty files
#        isTrain : boolean to indicate if the data is for training or testing
# output: nifty file data
def prepare_dataset_json(dir_path, isTrain):
    print("prepare_dataset_json")

    # get the images and labels folders paths
    images = glob(os.path.join(os.path.dirname(dir_path), "images", "*"))
    labels = glob(os.path.join(os.path.dirname(dir_path), "labels", "*"))

    # get images and labels names without the path
    images = sorted([img.replace(os.path.dirname(dir_path) + "\\" , "").replace("\\", "/") for img in images])
    labels = sorted([lbl.replace(os.path.dirname(dir_path) + "\\", "").replace("\\", "/") for lbl in labels])
    
    modality = {"0": "FLAIR", "1": "T1", "2": "T1CE", "3": "T2"}
    labels_dict = {"0": "background", "1": "edema", "2": "non-enhancing tumor", "3": "enhancing tumour"}

    if isTrain:
        key = "training"
        data_pairs = [{"image": img, "label": lbl} for (img, lbl) in zip(images, labels)]

    else:
        key = "test"
        data_pairs = [{"image": img} for img in images]

    dataset = {
        "labels": labels_dict,
        "modality": modality,
        key: data_pairs,
    }

    # save the dataset json file
    with open(os.path.join(os.path.dirname(dir_path), "dataset.json"), "w") as outfile:
        json.dump(dataset, outfile)


# function to run the prepare nifty files sequentially
def run_sequential(dir_path):
    print("run_sequential")
    prepare_nifty(dir_path)


# function to run the prepare nifty files in parallel
def prepare_dataset(input_folder_path, isTrain):
    print(f"Preparing BraTS21 dataset from: {input_folder_path}")
    start = time.time()

    run_sequential(input_folder_path)
    prepare_dirs(input_folder_path, isTrain)
    prepare_dataset_json(input_folder_path, isTrain)

    end = time.time()
    print(f"Preparing time: {(end - start):.2f}")

def nvidia_preprocess(root_path,data_path):
    # n --> to specify is it for nnunet(1) or 3d unet(0)
    print("nvidia_preprocess")
    print(root_path)
    preprocess_path = os.path.join(root_path, 'app/nnUNet/preprocess.py')
    python_path = sys.executable
    print(python_path)
    command = [
    python_path,
    preprocess_path,
    '--task', '11',
    '--exec_mode', 'test',
    '--data', data_path,
    '--results',data_path,
    '--ohe'
    ]   

   
    try:
        # Run the command
        subprocess.run(command, check=True)
        print("Command executed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    print("Finished!")


def nvidia_predict(root_path, data_path):

    print("nvidia_predict")


    import subprocess

    
    python_path = sys.executable
    nvidia_main_path = os.path.join(root_path, 'app/nnUNet/main.py')
    preprocessed_data_path = os.path.join(data_path, '11_3d/test')
    ckpt_path = os.path.join(root_path, 'app/nvidia_util/epoch=7-dice=84.40.ckpt')

    command = [
    python_path,
    nvidia_main_path,
    '--exec_mode', 'predict',
    '--gpus', '1',
    '--depth', '6',
    '--filters', '64', '96', '128', '192', '256', '384', '512',
    '--min_fmap', '2',
    '--amp',
    '--save_preds',
    '--task', '11',
    '--data', preprocessed_data_path,
    '--ckpt_path', ckpt_path,
    '--results', data_path,
    '--tta'
    ]
    try:
        # Run the command
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error: Command returned non-zero exit code. {e}")
    except Exception as e:
        print(f"Error: An unexpected error occurred. {e}")
    




def to_lbl(pred):
    print(pred.shape)
    pred = np.argmax(pred, axis=0)
    pred = np.transpose(pred, (2, 1, 0)).astype(np.uint8)
    print(pred.shape)
    return pred

def save_nifti_prediction(prediction_tuple,output_directory,root_path):

    '''
    prediction_tuple: a tuple containing the path of npy file to be converted
    output_directory: the path of the folder containing the uploaded files on slicer

    '''
    fname = prediction_tuple[0].split("/")[-1].split(".")[0]
    preds = [np.load(f) for f in prediction_tuple]
    p = to_lbl(np.mean(preds, 0))
    original_image_path = os.path.join(output_directory,f"BraTS2021_train/images/{fname}.nii.gz")
    img = nibabel.load(original_image_path)
    nibabel.save(
        nibabel.Nifti1Image(p, img.affine, header=img.header),
        os.path.join(output_directory, fname + ".nii.gz"),
    )

def prepare_prediction(output_directory,root_path):

    print('prepare_prediction')
    # model_switch 0 for 3dunet 1 for nvidia nnunet
    input_path =os.path.join(output_directory,"predictions_epoch=7-dice=84_40_task=11_fold=0_tta")
   
    # List all files in the directory
    files = os.listdir(input_path)
    # Check if there are any files
    if files:
        # Select the first file
        filename = files[0]
        # Concatenate the filename to the input path and convert it to a tuple
        prediction_tuple = (os.path.join(input_path, filename),)
        save_nifti_prediction(prediction_tuple , output_directory,root_path)
    else:
        print('no prediction to convert')  


def segment(input_folder_path, root_path, output_directory, basename):
    prepare_dataset(input_folder_path, False)
    print("predict")
    nvidia_preprocess(root_path,output_directory)
    nvidia_predict(root_path,output_directory)
    prepare_prediction(output_directory, root_path)
    print("Finished Nvidia-nnuNet!")
    return(os.path.join(output_directory, basename + ".nii.gz"))
