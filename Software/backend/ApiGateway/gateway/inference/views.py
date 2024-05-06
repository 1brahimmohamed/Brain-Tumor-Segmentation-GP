from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import pika
import environ

env = environ.Env()


def start_connection():
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
def inference(request):
    study_uid = request.data.get('study_uid')

    if not study_uid:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'study_uid is required'})

    connection, channel = start_connection()

    # send the study_uid to the inference queue
    channel.basic_publish(
        exchange='',
        routing_key='inference',
        body=study_uid,
        properties=pika.BasicProperties(
            delivery_mode=pika.DeliveryMode.Persistent
        )
    )
    print(f" [x] Sent {study_uid} to inference queue")

    connection.close()

    return Response(status=status.HTTP_200_OK,
                    data={'message': 'Sent to inference for processing successfully, check the results later'})
