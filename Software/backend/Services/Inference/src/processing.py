import os
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

