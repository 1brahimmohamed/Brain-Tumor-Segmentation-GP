import json
import os
import time
import shutil
import nibabel
import numpy as np
from glob import glob
from subprocess import call
from joblib import Parallel, delayed
from skimage.exposure import rescale_intensity


# function to load nifty files and return the data
# input: dir_path : path to the directory containing the nifty files
#        dir_name : name of the directory containing the nifty files (same as the file name)
#        suffix : suffix of the nifty file
# output: nifty file data
def load_nifty(dir_path, dir_name, suffix):
    print("load_nifty")
    file_name = dir_name + "_" + suffix + ".nii.gz"
    print("from load nifty", dir_path  + file_name)
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
    dir_name = dir_path.split('\\')[-1]


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
    images = sorted([img.replace(os.path.dirname(dir_path) + "/", "") for img in images])
    labels = sorted([lbl.replace(os.path.dirname(dir_path) + "/", "") for lbl in labels])

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
