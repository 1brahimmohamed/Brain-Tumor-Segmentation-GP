## First Trial

## Active Learning with BraTS Africa

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