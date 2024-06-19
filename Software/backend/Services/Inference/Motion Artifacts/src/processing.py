import keras
import tensorflow.keras.backend as K
from skimage import exposure
from dotenv import load_dotenv
import os
import pydicom
import dicomweb_client
import subprocess

from src.model_functions import ms_ssim_score, ssim_loss, ssim_score, psnr

load_dotenv()

current_dir = os.path.dirname(os.path.abspath(__file__))
studies_dir = os.path.join(current_dir, '..', 'studies')
model_path = os.path.join(current_dir, '..', 'models', 'stacked_model.h5')

client = dicomweb_client.api.DICOMwebClient(f"{os.getenv('ORTHANC_URL')}/dicom-web")


def load_model():
    global model_path

    print('loading the model')

    model = keras.models.load_model(
        model_path,
        custom_objects={
            'ms_ssim_score': ms_ssim_score,
            'ssim_loss': ssim_loss,
            'ssim_score': ssim_score,
            'psnr': psnr,
            'K': K
        }
    )

    print('model loaded')

    return model


def sample_reshape(sample):
    sample = sample.reshape(1, sample.shape[0], sample.shape[1], 1)
    return sample


def correct_volume(model, volume):
    volume = exposure.rescale_intensity(volume, out_range=(-1.0, 1.0))
    free_volume = []
    for slic in range(1, volume.shape[0] - 1):
        pred_slice = model.predict(
            [sample_reshape(volume[slic - 1]), sample_reshape(volume[slic]), sample_reshape(volume[slic + 1])],
            verbose=0)
        free_volume.append(pred_slice[0])
    return free_volume


def get_dicom_series(study_uid, series_uid):
    print(f"Retrieving series {series_uid} from study {study_uid}")

    instances = client.retrieve_series(study_instance_uid=study_uid, series_instance_uid=series_uid)

    # save the dicom files in a directory
    dicom_dir = os.path.join(studies_dir, series_uid)

    if not os.path.exists(dicom_dir):
        os.mkdir(dicom_dir)

    for instance in instances:
        # Define the output file path
        output_path = os.path.join(dicom_dir, f"{instance.SOPInstanceUID}.dcm")

        # Save the DICOM file
        instance.save_as(output_path)

    dicom_to_nifti(dicom_dir, studies_dir, series_uid)

    print(f"Series {series_uid} from study {study_uid} retrieved and converted to NIfTI")

    return f'{studies_dir}/{series_uid}.nii.gz'


def dicom_to_nifti(dicom_dir, output_dir, file_name):
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Call dcm2niix
    subprocess.run(["dcm2niix", "-z", "y", "-f", "%j", "-o", output_dir, dicom_dir], check=True)
