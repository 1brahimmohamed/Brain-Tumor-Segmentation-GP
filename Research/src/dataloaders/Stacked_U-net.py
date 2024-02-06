import numpy as np
from tensorflow.keras import backend as K
import scipy.io
import tensorflow as tf
from tensorflow.keras.optimizers import  Adam
from tensorflow.keras.callbacks import CSVLogger, ModelCheckpoint, LearningRateScheduler, ReduceLROnPlateau
import math
import pandas as pd
from Correction_Multi_input import Correction_Multi_input
from tensorflow.keras.models import model_from_json
import cv2
import os
from tensorflow.keras.callbacks import ModelCheckpoint,EarlyStopping
from tensorflow.keras.models import Model
from tensorflow.keras.losses import CosineSimilarity
from Kaggle_dataloader import data_loader
# -------------------------------------------------------
Train = True # True False
Test  = False # True False
# -------------------------------------------------------
nb_epoch      = 10
learningRate  = 0.001 # 0.001
optimizer     = Adam(learning_rate=learningRate)
batch_size    = 19
Height        = 256     # input image dimensions
Width         = 256
Prediction_path  = '/kaggle/working//Prediction'
Weights_path     = '/kaggle/working//Weights'

def save_model(path_weight, model, md='lstm'):
    model_json = model.to_json()
    with open(path_weight + "model_" + md + ".json", "w") as json_file:
        json_file.write(model_json)
    model.save_weights(path_weight + "model_" + md + ".h5")
    print("The model is successfully saved")

def load_model(path_weight, md='lstm', custom_objects=None):
    json_file = open(path_weight + "model_" + md + ".json", 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json, custom_objects=custom_objects)
    loaded_model.load_weights(path_weight + "model_" + md + ".h5")
    print("Loaded model from disk")
    return loaded_model

def ssim_score(y_true, y_pred):
	score = K.mean(tf.image.ssim(y_true, y_pred, 1.0))
	return score

def ssim_loss(y_true, y_pred):
	#loss_ssim = 1.0 - K.mean((tf.image.ssim(y_true, y_pred, 255.0)+1.0)/2.0)## SSIM range is between -1~1 so --> +1/2 is added
	#loss_ssim = 1.0 - K.mean(tf.image.ssim(y_true, y_pred, 255.0))
	loss_ssim = 1.0 - K.mean(tf.image.ssim(y_true, y_pred, 1.0))
	return loss_ssim

def fft_score(y_true, y_pred):
	freq_true = tf.signal.fft2d(tf.cast(y_true, dtype=tf.complex64))
	freq_true = tf.signal.fftshift(freq_true)
	abs_true = tf.abs(freq_true)
    
	phase_true = tf.math.angle(freq_true)
    
	freq_pred = tf.signal.fft2d(tf.cast(y_pred, dtype=tf.complex64))
	freq_pred = tf.signal.fftshift(freq_pred)
	abs_pred = tf.abs(freq_pred)
	phase_pred = tf.math.angle(freq_pred)
    
	abs_simi = 0.5 * (1.0 - tf.keras.losses.CosineSimilarity(axis=1)(abs_true, abs_pred))
	phase_simi = 0.5 * (1.0 - tf.keras.losses.CosineSimilarity(axis=1)(phase_true, phase_pred))
    
	score = (tf.reduce_mean(abs_simi) + tf.reduce_mean(phase_simi))*0.5
	return score
def fft_loss(y_true,y_pred):
	return 1-fft_score(y_true,y_pred)
def perceptual_loss(y_true, y_pred,model=modelvgg):
    # Assuming input images are grayscale, add an extra channel dimensio
    # Repeat the channel dimension to create pseudo-RGB images
#     base_model = VGG16(weights='imagenet', include_top=False)
#     modelvgg = Model(inputs=base_model.input, outputs=base_model.get_layer('block3_conv3').output)
    y_true = tf.repeat(y_true, 3, axis=-1)
    y_pred = tf.repeat(y_pred, 3, axis=-1)

    y_true_features = model(y_true)
    y_pred_features = model(y_pred)
    
    mse_loss = tf.keras.losses.mean_squared_error(y_true_features, y_pred_features)

    # Normalize the loss to be between 0 and 1
    normalized_loss = mse_loss / tf.reduce_max(mse_loss)

    return normalized_loss

def all_loss(y_true,y_pred):
	 return 0.7*perceptual_loss(y_true, y_pred)+0.3*ssim_loss(y_true,y_pred)
def scheduler(epoch):
	ep = 10
	if epoch < ep:
		return learningRate
	else:
		return learningRate * math.exp(0.1 * (ep - epoch)) # lr decreases exponentially by a factor of 10
# -------------------------------------------------------
def main():
	print('Reading Data ... ')
	path = '/kaggle/input/mahmoud-dataset'
	Data_loader = data_loader(path,[0.8,0.15,0.05])
	Data_loader.split_data()
	# train_data, train_label, valid_data, valid_label, test_data, test_label, fold2_train_before, fold3_valid_before, fold1_test_before, fold2_train_after, fold3_valid_after, fold1_test_after = read_data(train_data_path,train_GT_path,valid_data_path,valid_GT_path,test_data_path,test_GT_path)
	print('---------------------------------')
	# print('Trainingdata=',train_data.shape)
	# print('Traininglabel=',train_label.shape)
	# print('valid_data=',valid_data.shape)
	# print('valid_label=',valid_label.shape)
	# print('test_data=',test_data.shape)
	# print('test_label=',test_label.shape)
	print('---------------------------------')

	if Train:
		print('---------------------------------')
		print('Model Training ...')
		print('---------------------------------')
		model = Correction_Multi_input(Height, Width)
		# print(model.summary())
		csv_logger = CSVLogger(Weights_path+'Loss_Acc.csv', append=True, separator=',')
		reduce_lr = LearningRateScheduler(scheduler)
		model.compile(loss=all_loss, optimizer=optimizer, metrics=[ssim_score,'mse'])
		checkpoint_path = '/kaggle/working/model_all0.7p0.3s_epoch_{epoch:02d}_val_loss_{val_loss:.4f}.h5'
		model_checkpoint = ModelCheckpoint(checkpoint_path,
                                   monitor='val_loss',
                                   save_best_only=False,
                                   save_weights_only=False,
                                   mode='min',
                                   verbose=1)
# 		model.load_weights('/kaggle/input/leaky-relu/model_leaky_relu_epoch_07_val_loss_0.1516.h5')
		hist = model.fit(
      	Data_loader.generator('train',batch_size),
						steps_per_epoch=Data_loader.size[0]//batch_size,
						epochs = nb_epoch, #100,
						verbose = 1,          # Verbosity mode. 0 = silent, 1 = progress bar, 2 = one line per epoch
						validation_data=Data_loader.generator('test',batch_size),
						validation_steps=Data_loader.size[1]//batch_size,
						callbacks=[csv_logger, reduce_lr,model_checkpoint])
		model.save('/kaggle/working//stacked_model.h5')
		print("Saved H5")
		# Save the training history to a CSV file
		hist_df = pd.DataFrame(hist.history)
		hist_df.to_csv('/kaggle/working//training_history.csv', index=False)
		print("Saved Csv of loss")
		print('Saving Model...')
		save_model(Weights_path, model,'CorrectionUNet_') # to save the weight - 'CNN_iter_'+str(i)

	if Test:
		# Load the model
		print('========================================Load Model-s Weights=====================================')
		# model = load_model(Weights_path, 'CorrectionUNet_')
		#  # to load the weight
		custom_objects = {'ssim_loss': ssim_loss, 'ssim_score': ssim_score}

		# Load the model
		model = load_model(path_weight=Weights_path, md='lstm', custom_objects=custom_objects)
		print('---------------------------------')
		print('Evaluate Model on Testing Set ...')
		print('---------------------------------')
		#pred = model.predict(test_data)
		pred = model.predict(Data_loader.generator('validation',batch_size),steps=Data_loader.size[2]//batch_size)  # test_CE
		print('==================================')
		print('Predictions=',pred.shape)
		print('==================================')
main()