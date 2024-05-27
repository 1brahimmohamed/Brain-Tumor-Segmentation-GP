import os


def check_is_nifti(file):
    """
    Check if the uploaded file is a NIfTI file
    :param file:
    :return: boolean
    """
    allowed_extensions = {'.nii', '.nii.gz'}  # Define the allowed NIfTI file extensions

    # Check if the file extension is in the set of allowed NIfTI extensions
    return any(file.filename.lower().endswith(ext) for ext in allowed_extensions)


def remove_nifti_file_extension(file_name):
    """
    Remove the nifti file extension
    :param file_name: the file name
    :return: the file name without the nifti extension
    """
    # extension could be .nii or .nii.gz

    return file_name.split('.')[0]


def get_path(parent_id, case_id, fileModality):
    """
    Get the path of the case folder
    :param fileModality:
    :param parent_id:
    :param case_id: the case id
    :return: the path of the case folder
    """
    parent_path = os.path.join('storage', parent_id)
    case_folder_name = f'sub-{case_id}'
    return os.path.join(parent_path, case_folder_name, fileModality)


def edit_file_name(file_name, sub):
    """
    Edit the file name
    :param file_name: the file name
    :param sub: the sub id
    :return: the edited file name
    """
    # Split the string by underscores and remove the first chunk
    chunks = file_name.split('_')[1:]

    # Rejoin the remaining chunks back into a string
    new_file_name = '_'.join(chunks)

    return f'sub-{new_file_name}'


