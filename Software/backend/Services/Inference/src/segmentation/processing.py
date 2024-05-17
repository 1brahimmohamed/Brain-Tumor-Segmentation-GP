import os
from time import sleep

from dicomweb_client.api import DICOMwebClient
import requests

studies_dir = os.path.join(os.path.dirname(__file__), "studies")
os.makedirs(studies_dir, exist_ok=True)

orthanc_url = "http://orthanc:8042"
client = DICOMwebClient(orthanc_url)


def download_study(study_uid):
    print(f"Downloading study {study_uid}...")
    try:
        response = requests.get(f'{orthanc_url}/studies/{study_uid}/archive', stream=True)
        with open(os.path.join(studies_dir, f'{study_uid}.zip'), 'wb') as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
        print(f"Downloaded study {study_uid}...")

    except Exception as e:
        print(e)
        return


def download_nifti_series(study_orthanc_id, series_uids):
    print(f"Downloading series {series_uids}...")
    study_data = requests.get(f'{orthanc_url}/studies/{study_orthanc_id}')

    for series in study_data.json()['Series']:
        series_data = requests.get(f'{orthanc_url}/series/{series}')
        uid = series_data.json()['MainDicomTags']['SeriesInstanceUID']
        if uid in list(series_uids):
            try:
                response = requests.get(f'{orthanc_url}/series/{series}/nifti', stream=True)
                with open(
                        os.path.join(studies_dir, f'{uid}.nii.gz'),
                        'wb') as f:
                    for chunk in response.iter_content(chunk_size=1024):
                        if chunk:
                            f.write(chunk)

            except Exception as e:
                print(e)
                return


def apply_preprocessing():
    print(" [S] Applying preprocessing...")
    # time delay 2 seconds
    sleep(2)


def inference():
    print(" [S] Running inference...")
    sleep(35)

def converting_nifti_to_dicom_seg():
    print(" [S] Converting nifti to dicom seg...")
    sleep(2)
    print(" [S]  Failed to convert nifti to dicom seg...")