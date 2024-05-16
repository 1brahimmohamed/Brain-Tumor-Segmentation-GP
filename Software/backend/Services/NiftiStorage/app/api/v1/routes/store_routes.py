from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.utils import BDISModalityType
from app.core.config import settings
from pathlib import Path
from app.utils import store_helpers as utils
import os

store_router = APIRouter()

UPLOAD_DIR = Path(settings.UPLOADS_DIR)


@store_router.post("/")
async def upload_nifti_file(file: UploadFile = File(...), file_type: BDISModalityType = 'anat'):
    # Check if the file is empty
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No file was uploaded")

    # Get the file name from the upload
    file_name = UPLOAD_DIR / file.filename

    if file_name == '':
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No file selected")

    # Check if the file is a NIfTI file
    if not utils.check_is_nifti(file):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid file type, we only accept NIfTI files")

    # Remove the NIfTI file extension & prepare the file
    file_id = utils.remove_nifti_file_extension(file.filename)
    chunks = file_id.split('_')

    # Get the path of the case folder
    if file_type not in BDISModalityType:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid modality type")

    case_path = utils.get_path(chunks[0], chunks[1], file_type)

    # Create parent directory if it doesn't exist
    if not os.path.exists(case_path):
        os.makedirs(case_path)

    # Edit the file name
    ready_file_name = utils.edit_file_name(file.filename, chunks[1])
    file_path = os.path.join(case_path, ready_file_name)

    # Check if file already exists
    if os.path.exists(file_path):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File already exists")

        # if the file is .nii compress it to .nii.gz
    if file.filename.endswith('.nii'):
        file_path = file_path + '.gz'

    # Save the file to the case folder
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return {
        "status": "success",
        "message": "File uploaded successfully",
        "parent_id": chunks[0],
        "sub_id": chunks[1],
        "sequence_id": chunks[2],
    }
