import os
import subprocess
import nibabel as nib
import tensorflow as tf
from skimage import exposure
from math import ceil
import matplotlib.pyplot as plt
import random


class DataLoader:
    def __init__(self, data_path, split_ratio, batch_size=None):
        self.data_path = data_path
        self.split_ratio = split_ratio
        self.all_subjects = None
        self.subjects_lists = []
        self.labels = {'train': 0, 'test': 1, 'validation': 2}
        self.size = [0, 0, 0]
        self.batch_size = batch_size
        self.slices_number = None

    def list_subjects(self):
        subjects = os.listdir(self.data_path)
        subjects = [item for item in subjects if item.startswith('sub')]
        self.all_subjects = subjects

    def get_nifti_path(self, subject, number_of_motion='1'):
        ref_path_stand = f'{self.data_path}/{subject}/anat/{subject}_acq-standard_T1w.nii/'
        select_path_stand = subprocess.run(['ls', ref_path_stand], capture_output=True, text=True).stdout.replace("\n",
                                                                                                                  "")

        ref_path_motion = f'{self.data_path}/{subject}/anat/{subject}_acq-headmotion{number_of_motion}_T1w.nii/'
        select_path_motion = subprocess.run(['ls', ref_path_motion], capture_output=True, text=True).stdout.replace(
            "\n", "")

        return [ref_path_stand + select_path_stand, ref_path_motion + select_path_motion]

    def get_paired_volumes(self, path):
        if os.path.exists(path[0]) and os.path.exists(path[1]):
            free_data = nib.load(path[0]).get_fdata()
            #             free_data = exposure.rescale_intensity(free_data, out_range=(0.0, 1.0))
            free_data = exposure.rescale_intensity(free_data, out_range=(-1.0, 1.0))

            motion_data = nib.load(path[1]).get_fdata()
            #             motion_data = exposure.rescale_intensity(motion_data, out_range=(0.0, 1.0))
            motion_data = exposure.rescale_intensity(motion_data, out_range=(-1.0, 1.0))
            return tf.convert_to_tensor(free_data), tf.convert_to_tensor(motion_data)
        else:
            return None, None

    def split_data(self):
        self.list_subjects()
        if ceil(sum(self.split_ratio)) == 1 and len(self.split_ratio) <= 3:
            self.split_ratio.insert(0, 0)
            cumulative_sum = [sum(self.split_ratio[:i + 1]) for i in range(len(self.split_ratio))]
            number_of_subjects = len(self.all_subjects)

            for i in range(1, len(self.split_ratio)):
                self.subjects_lists.append(
                    self.all_subjects[int(round(cumulative_sum[i - 1] * number_of_subjects)):int(
                        round(cumulative_sum[i] * number_of_subjects))])

                self.size[i - 1] = len(self.subjects_lists[i - 1]) * 2 * 190

                if i - 1 == 0:
                    self.size[i - 1] -= 8 * 2 * 190
        else:
            print("The Summation of ratios is not equal to 1")

    def generator(self, mode):
        subjects = self.subjects_lists[self.labels[mode]]

        def data_gen():
            for subject in subjects:
                for i in range(2):
                    pathes = self.get_nifti_path(subject, str(i + 1))
                    free, motion = self.get_paired_volumes(pathes)
                    if motion is not None:
                        self.slices_number = motion.shape[0]

                        for slice_id in range(0, self.slices_number):
                            start_idx = slice_id + 1
                            end_idx = (slice_id + 1) + 1
                            if (end_idx < self.slices_number - 1):
                                free_slice = free[start_idx:end_idx]
                                free_slice = tf.transpose(free_slice, perm=[1, 2, 0])

                                motion_slice = motion[start_idx:end_idx]
                                motion_slice = tf.transpose(motion_slice, perm=[1, 2, 0])

                                motion_before_slice = motion[start_idx - 1:end_idx - 1]
                                motion_before_slice = tf.transpose(motion_before_slice, perm=[1, 2, 0])

                                motion_after_slice = motion[start_idx + 1:end_idx + 1]
                                motion_after_slice = tf.transpose(motion_after_slice, perm=[1, 2, 0])

                                yield (
                                    (motion_before_slice, motion_slice, motion_after_slice),
                                    free_slice
                                )

        input_signature = (
            (tf.TensorSpec(shape=(256, 256, 1), dtype=tf.float32),
             tf.TensorSpec(shape=(256, 256, 1), dtype=tf.float32),
             tf.TensorSpec(shape=(256, 256, 1), dtype=tf.float32)),
            tf.TensorSpec(shape=(256, 256, 1), dtype=tf.float32)
        )

        dataset = tf.data.Dataset.from_generator(data_gen, output_signature=input_signature)
        dataset = dataset.batch(self.batch_size)

        return dataset