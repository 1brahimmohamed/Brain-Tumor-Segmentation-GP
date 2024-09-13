import numpy as np
import tensorflow as tf

def create_center_rectangle_mask(mask_shape, rect_height, rect_width):
    mask_shape = mask_shape[1:]
    # Create a mask with a central rectangle of zeros
    mask = np.ones(mask_shape, dtype=np.float32)

    # Calculate the position of the top-left corner of the rectangle
    rect_top = (mask_shape[0] - rect_height) // 2
    rect_left = (mask_shape[1] - rect_width) // 2

    # Update the mask with the rectangle at the center
    mask[rect_top:rect_top+rect_height, rect_left:rect_left+rect_width,:] = 0

    # Convert the NumPy array to a TensorFlow tensor
    mask_tensor = tf.convert_to_tensor(mask, dtype=tf.float32)

    return mask_tensor

def crop_center_rectangle_mask(tensor, rect_height=50, rect_width=100):
    mask = create_center_rectangle_mask(tensor.shape, rect_height, rect_height)
    return tf.multiply(tensor, mask)