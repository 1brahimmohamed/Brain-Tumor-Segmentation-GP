from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import pika
import json
import environ

env = environ.Env()


def start_mq_connection():
    """
    Start a connection with rabbitmq server and return the connection and channel
    :return: connection, channel
    """

    # establish connection with rabbitmq server
    connection = pika.BlockingConnection(pika.ConnectionParameters(
        host=env('RABBITMQ_HOST'),
        port=env('RABBITMQ_PORT'),
        credentials=pika.PlainCredentials(
            env('RABBITMQ_USERNAME'),
            env('RABBITMQ_PASSWORD'),
        )
    ))

    channel = connection.channel()
    channel.queue_declare(queue='inference', durable=True)

    return connection, channel


@api_view(['POST'])
def segmentation_inference(request):
    study_uid = request.data.get('studyInstanceUid')
    sequences = request.data.get('sequences')

    print("study_instance_uid", study_uid)
    print("sequence mapping", sequences)

    if not study_uid:
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'message': 'studyInstanceUid is required'}
        )

    connection, channel = start_mq_connection()

    message = {
        'studyInstanceUid': study_uid,
        'sequences': sequences
    }

    # send the study_uid to the inference queue
    channel.basic_publish(
        exchange='',
        routing_key='inf_segmentation',
        body=json.dumps(message),
        properties=pika.BasicProperties(
            delivery_mode=pika.DeliveryMode.Persistent
        )
    )
    print(f" [x] Sent {study_uid} to segmentation inference queue")

    connection.close()

    return Response(
        status=status.HTTP_200_OK,
        data={'message': 'Sent to inference for processing successfully, check the results later'}
    )


@api_view(['POST'])
def motion_inference(request):
    study_uid = request.data.get('studyInstanceUid')
    series_uid = request.data.get('seriesInstanceUid')

    if not study_uid or not series_uid:
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'message': 'studyInstanceUid and seriesInstanceUid are required'}
        )

    connection, channel = start_mq_connection()

    message = {
        'studyInstanceUid': study_uid,
        'seriesInstanceUid': series_uid
    }

    channel.basic_publish(
        exchange='',
        routing_key='inf_motion_correction',
        body=json.dumps(message),
        properties=pika.BasicProperties(
            delivery_mode=pika.DeliveryMode.Persistent
        )
    )

    print(f" [x] Sent {study_uid} to motion inference queue")

    connection.close()

    return Response(
        status=status.HTTP_200_OK,
        data={'message': 'motion inference'}
    )


@api_view(['POST'])
def synthesis_inference(request):
    study_uid = request.data.get('studyInstanceUid')
    sequences = request.data.get('sequences')

    if not study_uid or not sequences:
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'message': 'studyInstanceUid and sequences are required'}
        )

    connection, channel = start_mq_connection()

    message = {
        'studyInstanceUid': study_uid,
        'sequences': sequences
    }

    channel.basic_publish(
        exchange='',
        routing_key='inf_sequence_synthesis',
        body=json.dumps(message),
        properties=pika.BasicProperties(
            delivery_mode=pika.DeliveryMode.Persistent
        )
    )

    print(f" [x] Sent {study_uid} to synthesis inference queue")

    return Response(
        status=status.HTTP_200_OK,
        data={'message': 'synthesis inference'}
    )
