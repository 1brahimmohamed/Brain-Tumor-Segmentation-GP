import nibabel as nib
import numpy as np
import random
from skimage import exposure
import os
import subprocess
class data_loader():
    def __init__(self,data_path,split_ratio):
        ''' 
            this function take the path of whole data {Movement-related artefacts (MR-ART) dataset}
            data_path : path for this data
            split_ratio : list of ratios for train,test,validation
        '''
        self.data_path = data_path 
        self.split_ratio = split_ratio # ratios to split the data with train,test,validation [in form of list]
        self.all_subjects = None # list contain all subject in the path 
        self.subjects_lists = [] # list of subjects for train,test,validation [in form of list]
        self.labels = {'train':0,'test':1,'validation':2} 
        self.size = [0,0,0] #size of data train,test,validation  [in form of list]
    def list_subjects(self):
        ''' 
        this function list all subjects in the data
        no parameters
        '''
        subjects = os.listdir(self.data_path)
        subjects = [item for item in subjects if item.startswith('sub')]
        self.all_subjects = subjects
    def get_nifti_path(self, subject,number_of_motion='1'):
        ref_path_stand = f'{self.data_path}/{subject}/anat/{subject}_acq-standard_T1w.nii/'
        select_path_stand = subprocess.run(['ls', ref_path_stand], capture_output=True, text=True).stdout.replace("\n", "")

        ref_path_motion = f'{self.data_path}/{subject}/anat/{subject}_acq-headmotion{number_of_motion}_T1w.nii/'
        select_path_motion = subprocess.run(['ls', ref_path_motion], capture_output=True, text=True).stdout.replace("\n", "")

        return [ref_path_stand+select_path_stand, ref_path_motion+select_path_motion]
    def get_paired_volumes(self,path):
        '''
        this function return nifti volume of free subject and motion subject and normalize them between [0,1]
        path: list of paths of free subject and motion subject
        '''
        if os.path.exists(path[0]) and os.path.exists(path[1]) :
            free_data = nib.load(path[0]).get_fdata()
            free_data = free_data.astype(np.float32)# read free volume
            free_data = exposure.rescale_intensity(free_data, out_range=(0.0,1.0)) # normalize over volume [0,1]
            motion_data = nib.load(path[1]).get_fdata()
            motion_data = motion_data.astype(np.float32)
            motion_data = exposure.rescale_intensity(motion_data, out_range=(0.0,1.0))
            return free_data,motion_data
        else:
            return None,None #
    def split_data(self):
        self.list_subjects()
        if sum(self.split_ratio) == 1 and len(self.split_ratio)<=3:
            self.split_ratio.insert(0,0)
            cumulative_sum = [sum(self.split_ratio[:i+1]) for i in range(len(self.split_ratio))]
            number_of_subjects = len(self.all_subjects)
            for i in range(1,len(self.split_ratio)):
                self.subjects_lists.append(self.all_subjects[int(round(cumulative_sum[i-1]*number_of_subjects)):int(round(cumulative_sum[i]*number_of_subjects))])
                self.size[i-1] = len(self.subjects_lists[i-1])*380
                if i-1 == 0:
                    self.size[i-1] -= 8*380
        else:
            print("The Summation of ratios not equal 1")
    def generator(self,select_subjects,batch_size):
        subjects = self.subjects_lists[self.labels[select_subjects]]
        while True:
            for subject in subjects:
                for i in range(2):
                    pathes = self.get_nifti_path(subject,str(i+1))
                    free,motion = self.get_paired_volumes(pathes)
                    if motion is not None:
                        number_of_batches = int(motion.shape[0]//batch_size)
                        for batch in range(number_of_batches):
                            free_batch = free[batch*batch_size+1:(batch+1)*batch_size+1]
                            free_batch = np.expand_dims(free_batch, axis=-1)
                            motion_batch = motion[batch*batch_size+1:(batch+1)*batch_size+1]
                            motion_batch = np.expand_dims(motion_batch, axis=-1)
                            motion_before_batch = motion[batch*batch_size:(batch+1)*batch_size]
                            motion_before_batch = np.expand_dims(motion_before_batch, axis=-1)
                            motion_after_batch = motion[batch*batch_size+2:(batch+1)*batch_size+2]
                            motion_after_batch = np.expand_dims(motion_after_batch, axis=-1)      
                            yield [motion_before_batch,motion_batch,motion_after_batch],free_batch