import json


def synthesis_callback(ch, method, properties, body):
    print(f" [SS] Received {body.decode()}, starting processing...")

    body = json.loads(body.decode())

    study_uid = body['studyInstanceUid']
    sequences = body['sequences']

    print(f" [SS] Study UID: {study_uid}")
    print(f" [SS] Sequences: {sequences}")

    print(" [SS] Synthesis done!")
    ch.basic_ack(delivery_tag=method.delivery_tag)
