import pika
from dotenv import load_dotenv
import os
from src import callback

load_dotenv()


def start_connection():
    try:
        # set up connection to RabbitMQ
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                host=os.getenv('RABBITMQ_HOST'),
                port=os.getenv('RABBITMQ_PORT'),
                credentials=pika.PlainCredentials(
                    os.getenv('RABBITMQ_USERNAME'),
                    os.getenv('RABBITMQ_PASSWORD')
                ))
        )

        channel = connection.channel()

        # create a queue for motion correction inference
        channel.queue_declare(
            queue='inf_segmentation',
            durable=True
        )

        print(' [Segmentation] Channel to segmentation inference queue created. Waiting for messages.')

        # set up consumer and callback function
        channel.basic_qos(prefetch_count=1)
        channel.basic_consume(queue='inf_segmentation', on_message_callback=callback.segmentation_callback)

        channel.start_consuming()
    except Exception as e:
        print(f'Error: {e}')
        start_connection()


if __name__ == '__main__':
    start_connection()
