import json


def motion_correction_callback(ch, method, properties, body):
    print(f" [M] Received {body.decode()}, starting processing...")

    body = json.loads(body.decode())
    study_uid = body['studyInstanceUid']
    series_uid = body['seriesInstanceUid']

    print(f" [M] Study UID: {study_uid}")
    print(f" [M] Series UID: {series_uid}")

    print(" [M] Motion correction done!")
    ch.basic_ack(delivery_tag=method.delivery_tag)
