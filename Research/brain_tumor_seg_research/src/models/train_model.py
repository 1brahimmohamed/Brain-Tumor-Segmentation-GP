import numpy as np
import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import CSVLogger, ModelCheckpoint, LearningRateScheduler
import math
import pandas as pd
from tensorflow.keras.models import model_from_json
from Research.brain_tumor_seg_research.src.data.make_dataset import *
from Research.brain_tumor_seg_research.src.utils.loss_eval_functions import *
from stacked_unet_self_assisted_priors import *

# Constants
TRAIN = 1  # True False
TEST = 0  # True False
NB_EPOCH = 30
LEARNING_RATE = 0.001  # 0.001 (default)
HEIGHT, WIDTH = 256, 256
PREDICTION_PATH = '/kaggle/working/Prediction'
WEIGHTS_PATH = '/kaggle/working/Weights'

print('Reading Data ... ')
data_path = "/kaggle/input/mahmoud-dataset"
# split_ratio = [0.7, 0.2, 0.1]
split_ratio = [0.03, 0.92, 0.03]
batch_size = 14

data_loader = DataLoader(data_path, split_ratio, batch_size)
data_loader.split_data()

train_dataset = data_loader.generator('train')
test_dataset = data_loader.generator('test')
validation_dataset = data_loader.generator('validation')


def scheduler(epoch):
    ep = 10
    if epoch < ep:
        return LEARNING_RATE
    else:
        return LEARNING_RATE * math.exp(0.1 * (ep - epoch))


def main():
    print('---------------------------------')
    print('Model Training ...')
    print('---------------------------------')
    model = Correction_Multi_input(HEIGHT, WIDTH)

    #         # Define the path to the model file
    #         model_path = "/kaggle/working/stacked_model_fft_01_val_loss_0.2138.h5"
    #         # Load the model with custom loss function
    #         model = tf.keras.models.load_model(model_path, custom_objects={'total_loss': total_loss,
    #                                                                       'ssim_score': ssim_score})

    csv_logger = CSVLogger(f'{WEIGHTS_PATH}_Loss_Acc.csv', append=True, separator=',')
    reduce_lr = LearningRateScheduler(scheduler)
    model.compile(loss=total_loss, optimizer=Adam(learning_rate=LEARNING_RATE),
                  metrics=[ssim_score, 'mse', psnr])

    checkpoint_path = '/kaggle/working/stacked_model_{epoch:02d}_val_loss_{val_loss:.4f}.h5'
    model_checkpoint = ModelCheckpoint(checkpoint_path,
                                       monitor='val_loss',
                                       save_best_only=False,
                                       save_weights_only=False,
                                       mode='min',
                                       verbose=1)

    model.fit(train_dataset,
              epochs=NB_EPOCH,
              #                          steps_per_epoch=data_loader.size[0] // batch_size,
              verbose=1,
              validation_data=validation_dataset,
              #                          validation_steps=data_loader.size[2] // batch_size,
              callbacks=[csv_logger, reduce_lr, model_checkpoint])


if __name__ == "__main__":
    main()
