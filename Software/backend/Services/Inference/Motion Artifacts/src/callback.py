import json
import time
import os
import nibabel as nib
import numpy as np
from src.processing import load_model, correct_volume, get_dicom_series

model = load_model()
current_dir = os.path.dirname(os.path.abspath(__file__))
studies_dir = os.path.join(current_dir, '..', 'studies')


def motion_correction_callback(ch, method, properties, body):
    print(f" [Motion Artifacts] Received {body.decode()}, starting processing...")

    body = json.loads(body.decode())
    study_uid = body['studyInstanceUid']
    series_uid = body['seriesInstanceUid']

    # 1. get the series from orthanc
    print('[Motion Artifacts] Loading the volume')
    volume_path = get_dicom_series(study_uid, series_uid)

    volume = nib.load(volume_path).get_fdata()

    print('[Motion Artifacts] Volume loaded')

    # 3. apply the model
    start_time = time.time()
    new_volume = correct_volume(model, volume)
    # End the timer
    end_time = time.time()

    elapsed_time = end_time - start_time

    # save the corrected volume
    nib.save(nib.Nifti1Image(np.array(new_volume), np.eye(4)), os.path.join(studies_dir, 'corrected_volume.nii.gz'))

    # 4. send results to orthanc
    print(f" [Motion Artifacts] Motion correction done in {elapsed_time} seconds!")

    ch.basic_ack(delivery_tag=method.delivery_tag)
