import pika
from dotenv import load_dotenv
from segmentation.callback import segmentation_callback
from synthesis.callback import synthesis_callback

import os

load_dotenv()

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
channel.queue_declare(queue='inf_segmentation', durable=True)
channel.queue_declare(queue='inf_motion_correction', durable=True)
channel.queue_declare(queue='inf_sequence_synthesis', durable=True)

print(' [*] Waiting for messages. To exit press CTRL+C')

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='inf_segmentation', on_message_callback=segmentation_callback)
channel.basic_consume(queue='inf_sequence_synthesis', on_message_callback=synthesis_callback)


channel.start_consuming()
