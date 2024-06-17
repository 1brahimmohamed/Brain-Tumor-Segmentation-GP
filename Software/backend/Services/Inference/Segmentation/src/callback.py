import json
import time
import os
import nibabel as nib
import numpy as np
import dicomweb_client.api
import pydicom
from src.processing import get_dicom_series, nifti_to_dicom_seg

current_dir = os.path.dirname(os.path.abspath(__file__))
studies_dir = os.path.join(current_dir, '..', 'studies')

client = dicomweb_client.api.DICOMwebClient(f"{os.getenv('ORTHANC_URL')}/dicom-web")


def segmentation_callback(ch, method, properties, body):
    print(f" [Segmentation] Received {body.decode()}, starting processing...")

    body = json.loads(body.decode())
    study_uid = body['studyInstanceUid']
    sequences = body['sequences']

    # 1. get the series from orthanc
    print('[Segmentation] Loading the volume')

    volume_paths = {}

    for key, value in sequences.items():
        print(f"Key: {key}, Value: {value}")
        volume_path = get_dicom_series(study_uid, value, key)
        volume_paths[key] = volume_path
        print(f"Volume path: {volume_path}")

    # 2. load the volumes
    t1 = nib.load(volume_paths['t1']).get_fdata()
    t2 = nib.load(volume_paths['t2']).get_fdata()
    flair = nib.load(volume_paths['flair']).get_fdata()
    t1ce = nib.load(volume_paths['t1c']).get_fdata()

    print('[Segmentation] Volumes loaded')

    # 3. apply the model
    start_time = time.time()

    ###### INSERT THE MODEL FUNCTION HERE ######
    new_segmentation = np.zeros(t1.shape)

    # End the timer
    end_time = time.time()

    elapsed_time = end_time - start_time

    # # save the corrected volume
    # nib.save(nib.Nifti1Image(np.array(new_segmentation), np.eye(4)),
    #          os.path.join(studies_dir, study_uid, 'segmentation.nii.gz'))

    print("Converting to DICOM SEG...")
    # convert to DICOM SEG
    nifti_to_dicom_seg(
        os.path.join(studies_dir, t1),
        os.path.join(studies_dir, study_uid, 'segmentation.nii.gz'),
        None,
        os.path.join(studies_dir, study_uid, 'segmentation.dcm')
    )

    print("Sending to Orthanc...")
    dcm_seg_dataset = pydicom.dcmread(os.path.join(studies_dir, 'segmentation.dcm'))

    # send the results to orthanc
    client.store_instances(datasets=[dcm_seg_dataset])

    ch.basic_ack(delivery_tag=method.delivery_tag)
