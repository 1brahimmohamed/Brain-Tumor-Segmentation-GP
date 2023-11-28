# Import basic packages for later use
import os
import shutil
import subprocess



def make_if_dont_exist(folder_path,overwrite=False):
    """
    creates a folder if it does not exists
    input:
    folder_path : relative path of the folder which needs to be created
    over_write :(default: False) if True overwrite the existing folder
    """
    if os.path.exists(folder_path):

        if not overwrite:
            print(f"{folder_path} exists.")
        else:
            print(f"{folder_path} overwritten")
            shutil.rmtree(folder_path)
            os.makedirs(folder_path)

    else:
      os.makedirs(folder_path)
      print(f"{folder_path} created!")


# Set environment Variables and creating folders
def env_setup():
    current_file_dir_path = os.path.dirname( os.path.dirname( os.path.dirname( os.path.abspath(__file__) ) ) ) 
    mount_dir = os.path.join(current_file_dir_path, "nnunet_util")
    path_dict = {
        
        "nnUNet_raw_data_base" : os.path.join(mount_dir, "nnUNet_raw"),
        "nnUNet_preprocessed" : os.path.join(mount_dir, "nnUNet_preprocessed"),
        "RESULTS_FOLDER" : os.path.join(mount_dir, "nnUNet_Results_Folder"),
    }
    # Write paths to environment variables
    for env_var, path in path_dict.items():
        os.environ[env_var] = path

    # Check whether all environment variables are set correct!
    for env_var, path in path_dict.items():
        if os.getenv(env_var) != path:
            print("Error:")
            print("Environment Variable {} is not set correctly!".format(env_var))
            print("Should be {}".format(path))
            print("Variable is {}".format(os.getenv(env_var)))
        make_if_dont_exist(path, overwrite=False)

    print("If No Error Occured Continue Forward. =)")


# for changin the names of the nifti files to what the model require


def naming_conv(folder_path):
    # iterate over the files in the folder
    for root, dirs, files in os.walk(folder_path):
        # check if the file name contains the search string
        for file in files:
            print(file)
            if "flair" in file:
                # replace the search string with the replace string
                new_filename = file.replace("flair", "0003")
                # rename the file
                os.rename(os.path.join(root, file), os.path.join(root, new_filename))
            if "t2" in file:
                # replace the search string with the replace string
                new_filename = file.replace("t2", "0002")
                # rename the file
                os.rename(os.path.join(root, file), os.path.join(root, new_filename))
            if "t1." in file:
                # replace the search string with the replace string
                new_filename = file.replace("t1.", "0000.")
                # rename the file
                os.rename(os.path.join(root, file), os.path.join(root, new_filename))
            if "t1ce" in file:
                # replace the search string with the replace string
                new_filename = file.replace("t1ce", "0001")
                # rename the file
                os.rename(os.path.join(root, file), os.path.join(root, new_filename))

            if  "seg" in file:
                file_path = os.path.join(folder_path, file)
                os.remove(file_path)   

    # removing the segmentation if exists
    # word_to_search = "seg"

    # for file_name in os.listdir(folder_path):
    #     file_path = os.path.join(folder_path, file_name)
    #     if word_to_search in file_name:
    #                 os.remove(file_path)
def run_linux_command(command):
    try:
        subprocess.run(command, shell=True, check=True)
        print("Command executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
    except FileNotFoundError as e:
        print(f"Command not found: {e}")






def run_nnUNet_predict(input_dir, output_dir, task, checkpoint, model_type):
    current_file_dir_path =os.path.dirname(os.path.dirname( os.path.dirname( os.path.dirname( os.path.abspath(__file__) ) ) ) )
    nnUNet_predict_path = f"{current_file_dir_path}\myenv\Scripts\\nnUNet_predict.exe"  # Replace with the actual path

    command = [
        nnUNet_predict_path,
        "-i", input_dir,
        "-o", output_dir,
        "-t", str(task),
        "-chk", checkpoint,
        "-m", model_type,
        
    ]

    try:
        subprocess.run(command, shell=True, check=True)
        print("Command executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
    except FileNotFoundError as e:
        print(f"Command not found: {e}")

def predict_nnunet(input_directory,output_directory):
    env_setup()
    naming_conv(input_directory)
    # Specify the input parameters
    input_dir = input_directory
    output_dir = output_directory
    task = 501
    checkpoint = "Copy of model_latest"
    model_type = "3d_fullres"
    # Call the function to execute the nnUNet_predict command
    run_nnUNet_predict(input_dir, output_dir, task, checkpoint, model_type)
