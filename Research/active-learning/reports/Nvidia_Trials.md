## First Trial

## Active Learning with BraTS Africa Dataset

All Checkpoints can be found [here](https://drive.google.com/drive/folders/17GD2gx6FPrk4PJbMimwGQrBYEIyK9MGc?usp=drive_link).

**Datasets:**
- BraTS2021: 1251 samples (1000 training, 251 validation)
- BraTS-Africa: 60 samples (50 unlabeled pool, 10 test)

### Experiments:

#### i- Pre-trained model:
Trained for 15 epochs on only BraTS2021 dataset with batch size 1 (due to GPU memory limitation).

#### ii- Retraining the model from scratch for 15 epochs:

**Sampling Strategies:**
1. Uncertainty sampling: Selected 10 samples from BraTS Africa to add to the training data.
2. Random sampling: Selected 10 samples from BraTS Africa to add to the training data.

**Dataset Size after Sampling:**
- Training set: 1010 (1000 BraTS2021 + 10 BraTS Africa)
- Validation set: 251 (BraTS2021)

**Results:**
- ![Validation Set Results](/Research/active-learning/reports/figures/nvidia_SSA_FromScratch_val.jpg)
- ![Test Set Results](/Research/active-learning/reports/figures/nvidia_SSA_FromScratch_test.jpg)

#### iii- Fine-Tuning all pre-trained model parameters for 15 epochs:

**Sampling Strategies:**
1. Uncertainty sampling: Selected 10 samples from BraTS Africa to add to the training data.
2. Random sampling: Selected 10 samples from BraTS Africa to add to the training data.

**Dataset Size after Sampling:**
- Training set: 1010 (1000 BraTS2021 + 10 BraTS Africa)
- Validation set: 251 (BraTS2021)

**Results:**
- ![Test Set Results](/Research/active-learning/reports/figures/nvidia_SSA_FineTuning_test.jpg)

### Conclusion:
- diversity sampling needed
- proportionate ratio in retraining data needed

-------------------------------------------------------------
## Second Trial

## Active Learning with BraTS Pediatric Dataset

All Checkpoints can be found [here](https://drive.google.com/drive/folders/1UwmRpeU4YLPkuqy5brPkonUwvshRaLmD?usp=drive_link).


1. preparing the data to match BraTS2021 dataset: [naming_map](https://drive.google.com/file/d/1jbRu2yu-OlwjZ79Q1zxy6fLOIHiDlJ4h/view?usp=drive_link)
2. Testing optmized nnUNet performance on the dataset: [results](https://drive.google.com/file/d/1hNxFxDDZhCCsTnMjpvYuV82JpNlWmyer/view?usp=sharing)
3. BraTS_PED investigation: [ppt](https://docs.google.com/presentation/d/1Bk36ZAJ5kMIjvizbqm74k8EntvvvV4Az/edit?usp=drive_link&ouid=100634944823545967799&rtpof=true&sd=true)

### Experiments:

#### i- [Pre-trained model](https://drive.google.com/drive/folders/15WuKaY2M_GNmDKmO05UXM6WBgZPggffS?usp=sharing):
Trained for 15 epochs on only BraTS2021 dataset with batch size 1 (due to GPU memory limitation).
**Dataset Size:**
- Training set: 100 (all BraTS2021)
- Validation set: 251 (BraTS2021)
#### ii- Fine-Tuning all pre-trained model parameters for 15 epochs:

**Sampling Strategies:**
1. [Uncertainty sampling](https://drive.google.com/drive/folders/1Dbqk9PyACKG1wFvn56MzhenyYZbT0Wbt?usp=drive_link): Selected 20 samples from BraTS PED to add to the training data.
2. [Random sampling](https://drive.google.com/drive/folders/1Xhk3q-0Z-mqzW0CNV7cg7BEvs8IB4dty?usp=drive_link): Selected 20 samples from BraTS PED to add to the training data.

**Dataset Size after Sampling:**
- Training set: 120 (100 BraTS2021 + 20 BraTS PED)
- Validation set: 251 (BraTS2021)

**Results:**
- ![Test Set Results](/Research/active-learning/reports/figures/nvidia_PED_FineTuning_test.jpg)

### next steps:
- trying different numbers of BraTS2021 training data and evaluate
- add 20  more samples from BraTS PED and evaluate
- use diversity sampling method
------------------------------

## Second Trial - Active iterations

## Active Learning with BraTS Pediatric Dataset

All Checkpoints can be found [here](https://drive.google.com/drive/folders/1VQEBdiEKKnanxh1sgiZxiLiPRF-PhbYC?usp=drive_link).

### Experiments:
1. Adding another 20 samples after active iteration 1 from unlabelled pool without deleting the selected data (repeated selected data)
**Results:**
- ![Test Set Results](/Research/active-learning/reports/figures/nvidia_PED_ActiveIteration_Approach.jpg)

2. Adding from unlabelled pool and deleting the selected data (3 more active iterations)
**Sampling Strategies:**


**Results:**
- ![Test Set Results](/Research/active-learning/reports/figures/nvidia_PED_ActiveIterations.jpg)

### next steps:
- trying different numbers of BraTS2021 training data and evaluate
- use diversity sampling method
------------------------------