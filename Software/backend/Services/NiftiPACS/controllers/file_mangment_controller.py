from flask import request
import os


def get_path(parent_id, case_id):
    """
    Get the path of the case folder
    :param parent_id:
    :param case_id: the case id
    :return: the path of the case folder
    """
    parent_path = os.path.join(os.environ.get('UPLOAD_FOLDER'), parent_id)
    return os.path.join(parent_path, case_id)


def upload_file():
    """
      Upload a file to the case folder
      :param file: the file to upload
      :param case_id: the case id
      :return: the path of the uploaded file
      """

    # Check if the post request has the file part'
    print(request.files.getlist("file"))

    if 'file' not in request.files:
        return {
            "status": "error",
            "message": "No file part in the request"
        }, 400

    file = request.files['file']

    # Check if the file is empty
    if file.filename == '':
        return {
            "status": "error",
            "message": "No file selected"
        }, 400

    # Check if the file is a nifti file
    if file and not check_is_nifti(file):
        return {
            "status": "error",
            "message": "Invalid file type, we only accept Nifti files"
        }, 400

    file_id = remove_nifti_file_extension(file.filename)
    case_id = file_id.split('_')[0] + '_' + file_id.split('_')[1]
    parent_id = file_id.split('_')[0]

    case_path = get_path(parent_id, case_id)

    # Create parent directory if it doesn't exist
    if not os.path.exists(case_path):
        os.makedirs(case_path)

    file_path = os.path.join(case_path, file.filename)

    # Check if file already exists
    if os.path.exists(file_path):
        return {
            "status": "error",
            "message": "File already exists"
        }, 400

    # if the file is .nii compress it to .nii.gz
    if file.filename.endswith('.nii'):
        file_path = file_path + '.gz'

    file.save(file_path)

    return ({"path": file_path}), 200


def get_nifti_file(file_id):
    case_id = file_id.split('_')[0] + '_' + file_id.split('_')[1]
    parent_id = case_id.split('_')[0]
    case_path = get_path(parent_id, case_id)

    if os.path.exists(case_path):
        if os.path.exists(os.path.join(case_path, file_id + '.nii.gz')):
            # TODO: return the file instead of the path
            return os.path.join(case_path, file_id + '.nii.gz')
        else:
            return {
                "status": "error",
                "message": "File not found"
            }, 404
    else:
        return {
            "status": "error",
            "message": "File not found"
        }, 404


def get_nifti_case(case_id):
    parent_id = case_id.split('_')[0]
    case_path = get_path(parent_id, case_id)

    if os.path.exists(case_path):
        return os.listdir(case_path)
    else:
        return {
            "status": "error",
            "message": "File not found"
        }, 404


def remove_nifti_file_extension(file_name):
    """
    Remove the nifti file extension
    :param file_name: the file name
    :return: the file name without the nifti extension
    """
    # extensio could be .nii or .nii.gz

    return file_name.split('.')[0]


def check_is_nifti(file):
    allowed_extensions = {'.nii', '.nii.gz'}  # Define the allowed NIfTI file extensions
    # Check if the file extension is in the set of allowed NIfTI extensions
    return any(file.filename.lower().endswith(ext) for ext in allowed_extensions)
