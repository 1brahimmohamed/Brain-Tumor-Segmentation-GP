import os
from fastapi import APIRouter, HTTPException, status, Response
from fastapi.responses import FileResponse
from shutil import make_archive
from app.utils import BDISModalityType

retrieve_router = APIRouter()
from pathlib import Path
from app.core.config import settings

UPLOAD_DIR = Path(settings.UPLOADS_DIR)


def create_zip_file_from_folder(folder_path, zip_path, response: Response):
    # if there is a zip file already, delete it
    if os.path.exists(f'{zip_path}.zip'):
        os.remove(f'{zip_path}.zip')

    # create the new zip file
    make_archive(f'{zip_path}', 'zip', folder_path)

    # Set the response headers
    response.headers["Content-Disposition"] = f"attachment; filename={os.path.basename(zip_path)}"
    response.headers["Content-Type"] = "application/zip"

    # Send the zip file as a response
    with open(f'{zip_path}.zip', "rb") as f:
        content = f.read()
        custom_resp = Response(content)

    os.remove(f'{zip_path}.zip')
    return custom_resp

@retrieve_router.get("/project/{project_id}/sub/{sub_id}/modality/{modality_id}/file/{file_name}")
async def retrieve_file(project_id: str, sub_id: str, modality_id: BDISModalityType, file_name: str):
    # check if the file exists
    if not os.path.exists(UPLOAD_DIR / project_id / f'sub-{sub_id}' / modality_id / file_name):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The file does not exist")

    # send the file
    return FileResponse(UPLOAD_DIR / project_id / f'sub-{sub_id}' / modality_id / file_name)


@retrieve_router.get("/project/{project_id}/sub/{sub_id}/modality/{modality_id}")
async def retrieve_files(project_id: str, sub_id: str, modality_id: str, response: Response):
    # check if the file exists
    if not os.path.exists(UPLOAD_DIR / project_id / f'sub-{sub_id}' / modality_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The file does not exist")

    # create the zip file
    zip_path = UPLOAD_DIR / project_id / f'sub-{sub_id}' / modality_id

    return create_zip_file_from_folder(UPLOAD_DIR / project_id / f'sub-{sub_id}' / modality_id, f'{zip_path}', response)


@retrieve_router.get("/project/{project_id}/sub/{sub_id}")
async def retrieve_all_files(project_id: str, sub_id: str, response: Response):
    # check if the file exists
    if not os.path.exists(UPLOAD_DIR / project_id / f'sub-{sub_id}'):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The file does not exist")

    # create zip file
    zip_path = UPLOAD_DIR / project_id / f'sub-{sub_id}'

    return create_zip_file_from_folder(UPLOAD_DIR / project_id / f'sub-{sub_id}', f'{zip_path}', response)


@retrieve_router.get("/project/{project_id}")
async def retrieve_all_subs(project_id: str, response: Response):
    # check if the file exists
    if not os.path.exists(UPLOAD_DIR / project_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The file does not exist")

    # create zip file
    zip_path = UPLOAD_DIR / project_id

    return create_zip_file_from_folder(UPLOAD_DIR / project_id, f'{zip_path}', response)