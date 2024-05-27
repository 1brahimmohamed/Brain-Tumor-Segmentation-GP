from . import processing
import json


def segmentation_callback(ch, method, properties, body):
    print(f" [S] Received data, starting downloading...")

    # The body is a JSON string, so we need to parse it
    body = json.loads(body.decode())
    study_uid = body['studyInstanceUid']
    sequences = body['sequences']

    print(f" [S] Study UID: {study_uid}")
    print(f" [S] Sequences: {sequences}")

    # # The study UID is in the 'study_uid' key
    processing.download_study(study_uid)

    print(" [S] Preprocessing Started ...")
    processing.apply_preprocessing()

    print(" [S] Inference Started...")
    processing.inference()

    processing.converting_nifti_to_dicom_seg()

    print(" [S] Segmentation done!")
    ch.basic_ack(delivery_tag=method.delivery_tag)
