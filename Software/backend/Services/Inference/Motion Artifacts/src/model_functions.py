import tensorflow as tf
from tensorflow.keras.applications import VGG16
from tensorflow.keras.models import Model


def ms_ssim_score(y_true, y_pred):
    score = tf.reduce_mean(tf.image.ssim_multiscale(y_true, y_pred, 2.0))
    return score


def ms_ssim_loss(y_true, y_pred):
    loss_ssim = 1.0 - tf.reduce_mean(tf.image.ssim_multiscale(y_true, y_pred, 2.0))
    return loss_ssim


def ssim_score(y_true, y_pred):
    score = tf.reduce_mean(tf.image.ssim(y_true, y_pred, 2.0))
    return score


def ssim_loss(y_true, y_pred):
    loss_ssim = 1.0 - tf.reduce_mean(tf.image.ssim(y_true, y_pred, 2.0))
    return loss_ssim


def l2_loss(y_true, y_pred):
    """
    Computes the L2 loss between the ground truth and predicted tensors.

    Parameters:
        y_true (tf.Tensor): Ground truth tensor.
        y_pred (tf.Tensor): Predicted tensor.

    Returns:
        tf.Tensor: Normalized L2 loss.

    This function calculates the mean squared error (MSE) between the ground truth
    and predicted tensors. It then reduces the MSE along the spatial dimensions,
    typically representing the height and width of the tensors, resulting in a
    tensor of shape (batch_size,), where each element represents the mean MSE
    for a single sample in the batch.

    The loss is then normalized using L2 normalization to ensure that it falls
    within the range of 0 to 1. Finally, the mean of the normalized loss across
    the batch is computed and returned.
    """
    mse = tf.keras.losses.mean_squared_error(y_true, y_pred)

    # Reduce on spatial information
    batch_mse = tf.reduce_mean(mse, axis=(1, 2))

    # Normalize the loss function to be between 0 and 1
    normalized_loss = tf.nn.l2_normalize(batch_mse, axis=-1)

    # Compute the mean of the normalized loss across the batch
    normalized_reduced_loss = tf.reduce_mean(batch_mse)

    return normalized_reduced_loss


def spatial_fft_loss(y_true, y_pred):
    """
    Custom loss function for spatial loss with FFT features.

    Args:
        y_true: Ground truth image(s).
        y_pred: Predicted image(s).

    Returns:
        Normalized reduced spatial loss.

    This function defines a custom loss for training neural networks. It applies a Fourier Transform
    to the true and predicted images, extracts the real and imaginary parts of the transformed
    features, and calculates the mean squared error between them. The loss is then normalized and
    reduced to a single scalar value.

    """
    # Apply Fourier Transform to the true and predicted images
    true_fft = tf.signal.fft2d(tf.cast(y_true, dtype=tf.complex64))
    pred_fft = tf.signal.fft2d(tf.cast(y_pred, dtype=tf.complex64))

    # Extract Real & Imaginary parts
    true_fft_real = tf.math.real(true_fft)
    true_fft_imag = tf.math.imag(true_fft)
    pred_fft_real = tf.math.real(pred_fft)
    pred_fft_imag = tf.math.imag(pred_fft)

    # Crop center rectangles for real and imag
    true_fft_real_cropped = crop_center_rectangle_mask(true_fft_real)
    true_fft_imag_cropped = crop_center_rectangle_mask(true_fft_imag)
    pred_fft_real_cropped = crop_center_rectangle_mask(pred_fft_real)
    pred_fft_imag_cropped = crop_center_rectangle_mask(pred_fft_imag)

    # Calculate L2 loss
    mse_real = tf.keras.losses.mean_squared_error(true_fft_real_cropped, pred_fft_real_cropped)
    mse_imag = tf.keras.losses.mean_squared_error(true_fft_imag_cropped, pred_fft_imag_cropped)

    # Total L2 loss
    total_loss = 0.5 * (mse_real + mse_imag)

    # Reduce on spatial information
    batch_loss = tf.reduce_mean(total_loss, axis=(1, 2))

    # Normalize the loss function to be between 0 and 1
    normalized_loss = tf.nn.l2_normalize(batch_loss, axis=-1)

    normalized_reduced_loss = tf.reduce_mean(normalized_loss)

    return normalized_reduced_loss


def init_vgg16_model(perceptual_layer_name='block3_conv3'):
    """
    Initialize a pre-trained VGG16 model for feature extraction.

    Args:
        perceptual_layer_name: Name of the layer to extract features from.

    Returns:
        Pre-trained VGG16 model with specified layer for feature extraction.

    This function loads a pre-trained VGG16 model with ImageNet weights and removes the top
    classification layers. It then extracts the specified layer for feature extraction and
    freezes the model's layers to prevent further training.

    """
    # Load pre-trained VGG16 model without the top classification layers
    vgg_model = VGG16(include_top=False, weights='imagenet', input_shape=(256, 256, 3))

    # Extract the specified layer from the VGG16 model
    perceptual_model = Model(inputs=vgg_model.input, outputs=vgg_model.get_layer(perceptual_layer_name).output)

    # Freeze the layers in the perceptual model so they are not trained further
    for layer in perceptual_model.layers:
        layer.trainable = False

    print("VGG16 Model Initialized")
    return perceptual_model


# Initialize VGG16 model for feature extraction
perceptual_model = init_vgg16_model()


def perceptual_fft_loss(y_true, y_pred):
    """
    Custom loss function for perceptual loss with FFT features.

    Args:
        y_true: Ground truth image(s).
        y_pred: Predicted image(s).

    Returns:
        Normalized reduced perceptual loss.

    This function defines a custom loss for training neural networks. It extracts features from
    true and predicted images using a pre-trained VGG16 model, applies a Fourier Transform to these
    features, and calculates the mean squared error between the real and imaginary parts of the
    transformed features. The loss is then normalized and reduced to a single scalar value.

    """
    # Convert single-channel images to RGB
    y_true_rgb = tf.repeat(y_true, 3, axis=-1)
    y_pred_rgb = tf.repeat(y_pred, 3, axis=-1)

    # Preprocess images for VGG16
    y_true_processed = tf.keras.applications.vgg16.preprocess_input(y_true_rgb)
    y_pred_processed = tf.keras.applications.vgg16.preprocess_input(y_pred_rgb)

    # Extract features from specified layer for true and predicted images
    features_true = perceptual_model(y_true_processed)
    features_pred = perceptual_model(y_pred_processed)

    # Apply Fourier Transform to the true and predicted images
    true_fft = tf.signal.fft2d(tf.cast(features_true, dtype=tf.complex64))
    pred_fft = tf.signal.fft2d(tf.cast(features_pred, dtype=tf.complex64))

    # Extract Real & Imaginary parts
    true_fft_real = tf.math.real(true_fft)
    true_fft_imag = tf.math.imag(true_fft)
    pred_fft_real = tf.math.real(pred_fft)
    pred_fft_imag = tf.math.imag(pred_fft)

    # Crop center rectangles for real and imag
    true_fft_real_cropped = crop_center_rectangle_mask(true_fft_real)
    true_fft_imag_cropped = crop_center_rectangle_mask(true_fft_imag)
    pred_fft_real_cropped = crop_center_rectangle_mask(pred_fft_real)
    pred_fft_imag_cropped = crop_center_rectangle_mask(pred_fft_imag)

    # Calculate L2 loss
    mse_real = tf.keras.losses.mean_squared_error(true_fft_real_cropped, pred_fft_real_cropped)
    mse_imag = tf.keras.losses.mean_squared_error(true_fft_imag_cropped, pred_fft_imag_cropped)

    # Total L2 loss
    total_loss = 0.5 * (mse_real + mse_imag)

    # Reduce on spatial information
    batch_loss = tf.reduce_mean(total_loss, axis=(1, 2))

    # Normalize the loss function to be between 0 and 1
    normalized_loss = tf.nn.l2_normalize(batch_loss, axis=-1)

    normalized_reduced_loss = tf.reduce_mean(normalized_loss)

    return normalized_reduced_loss


def perceptual_loss(y_true, y_pred):
    """
    Custom loss function for perceptual loss.

    Args:
        y_true: Ground truth image(s).
        y_pred: Predicted image(s).

    Returns:
        Normalized reduced perceptual loss.

    This function defines a custom loss for training neural networks. It converts single-channel
    images to RGB, preprocesses them for VGG16, and extracts features from a specified layer
    using a pre-trained VGG16 model. It then calculates the mean squared error between the features
    of the true and predicted images. The loss is normalized and reduced to a single scalar value.

    """
    # Convert single-channel images to RGB
    y_true_rgb = tf.repeat(y_true, 3, axis=-1)
    y_pred_rgb = tf.repeat(y_pred, 3, axis=-1)

    # Preprocess images for VGG16
    y_true_processed = tf.keras.applications.vgg16.preprocess_input(y_true_rgb)
    y_pred_processed = tf.keras.applications.vgg16.preprocess_input(y_pred_rgb)

    # Extract features from specified layer for true and predicted images
    features_true = perceptual_model(y_true_processed)
    features_pred = perceptual_model(y_pred_processed)

    # Calculate L2 loss
    mse = tf.keras.losses.mean_squared_error(features_true, features_pred)

    # Reduce on spatial information
    batch_loss = tf.reduce_mean(mse, axis=(1, 2))

    # Normalize the loss function to be between 0 and 1
    normalized_loss = tf.nn.l2_normalize(batch_loss, axis=-1)

    normalized_reduced_loss = tf.reduce_mean(normalized_loss)

    return normalized_reduced_loss


def psnr(y_true, y_pred):
    return tf.reduce_mean(
        -tf.image.psnr(y_true, y_pred, max_val=2.0))  # Adjust max_val for data normalized between -1 and 1


