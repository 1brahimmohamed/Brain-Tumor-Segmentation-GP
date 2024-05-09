# Brain Tumor Segmentation with 3D Slicer Extension

## Overview

This project implements a 3D Slicer extension for brain tumor segmentation using an AI models. The extension allows users to interactively edit the segmentation resulting from the models and retrain them to improve performance.

## Useful links


https://www.slicer.org/wiki/Documentation/Nightly/Developers/ExtensionWizard
Extension wizard simplifies the process of creating extensions by providing a mechanism to create extensions and modules from templates.

https://slicer.readthedocs.io/en/latest/developer_guide/script_repository.html
Provides python code to handle nodes 

https://slicer.readthedocs.io/en/latest/developer_guide/script_repository.html#segmentations
https://discourse.slicer.org/t/setting-up-the-qmrml-segment-editor-widget-in-ui/24486
Provides python code to add segment editor module within your own module

## Features

- 3D Slicer extension for brain tumor segmentation
- Integration with an AI model for automated segmentation
- Interactive segmentation editing within 3D Slicer
## Structure 
```
MMMAI/
├── InteractiveSegmentation/
│   ├── __pycache__/
│   │   └── InteractiveSegmentation.cpython-39.pyc
│   ├── input/
│   │   ├── subject1.nii.gz
│   │   └── ...
│   ├── data/
│   │   └── BraTS2021_train
│   │   |    ├── BraTS2021_xxxxx
│   │   |        ├── BraTS2021_xxxxx_t1.nii.gz
│   │   |        ├── BraTS2021_xxxxx_t2.nii.gz
│   │   |        ├── BraTS2021_xxxxx_seg.nii.gz
│   │   |        └── ...
│   │   └── ...
│   │
│   ├── model/
│   │   └── v2
│   │       ├── nnunet.py
│   │       ├── utils.py
│   │       └── nvidia_nnunet.py
│   ├── nnunet_util/
│   │   └── nnUNet_Results_Folder
│   │       └── nUNet
│   │           └── 3d_fullres
│   │               └── Task501_BraTS2021
│   │                   └── Task501_BraTS2021
│   │                       └── nnUNetTrainerV2__nnUNetPlansv2.1
│   │                            └── fold_0
│   │                                └── model checkPoint
│   ├── nvidia_util/
│   │   └── model checkPoint
│   │
│   ├── Resources/
│   │   └── ...
│   ├── Testing/
│   ├── CMakeLists.txt
│   └── InteractiveSegmentation.py
├── nnUNet-1/
│   ├── exploratory_data_analysis.ipynb
│   └── model_training.ipynb
├── CMakeLists.txt
├── MMMAI.png
├── project_structure.txt
└── readme.md
```
## Prerequisites

Before running the project, ensure you have the following installed:

-  [3D Slicer](https://download.slicer.org/) (version 5.4.0)
- Python (version 3.9.7)

## Installation

### 1. Clone the repository:

 ```bash
   git clone https://github.com/
   cd Interactive Segmentation
   pip install -r requirements.txt
   pip install python==3.9.7
    
```   

### 2. Set up the project within 3D Slicer:

    - Open 3D Slicer.
    - Navigate to the "Edit" menu and select "Application Settings"
    - In the "Modules" section, add the path to the yourproject directory as an additional module path.
    - You will find the module under "Modules -> MMMAI -> Interactive Segmentation"


### 3. dependencies:

```bash
#for nvidia nnunet /3d unet
git clone https://github.com/NVIDIA/DeepLearningExamples 
# nnunet that supports windows os and linux)
git clone https://github.com/MRCWirtz/nnUNet-1.git 
```
#### In slicer python console:

#### For Vanilla nnunet model:
checkpoint link https://drive.google.com/drive/folders/1vt1qO4dca5Wzo5rKwG10iA-iJPMpTKTB?usp=sharing
1- 
```bash
pip_install("nnunet")
```
2- 
if still not working try this
```bash
#Specify the custom index URL and versions
index_url = "https://download.pytorch.org/whl/cu118"
torch_version = "1.10.0+cu118"
torchvision_version = "0.11.1+cu118"
torchaudio_version = "0.10.0+cu118"
# Install the packages
pip_install(f"--index-url {index_url} torch=={torch_version} torchvision=={torchvision_version} torchaudio=={torchaudio_version}")
```

#### For NVIDIA nnunet model:
STILL NOT WORKING 

checkpoint link https://drive.google.com/drive/folders/1KF8PbHhGKyRfHzoCVIyiaPPjWTaUJA0w?usp=sharing
```bash
pip_uinstall("torch==2.1.0")
pip_uinstall("scikit-image")
pip_uinstall("scipy")
```

```bash
pip_install("torch==2.1.0")
pip_install("scikit-image")
pip_install("scipy")
```

```bash
index_url = "https://download.pytorch.org/whl/cu118"
torch_version = "2.1.0+cu118"

# Install the packages without specifying versions for torchvision and torchaudio
pip_install(f"--index-url {index_url} torch=={torch_version} torchvision torchaudio")
```
