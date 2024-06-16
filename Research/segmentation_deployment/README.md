# Segmentation Server with NVIDIA Optimized nnUNet

This server uses NVIDIA's optimized nnUNet for medical image segmentation.

<span style="color:red">This server should be run on a Linux environment</span>

## Folder Structure
```
app/ 
│
├── apex/
│
├── model/
│ ├── setup.ipynb
│ └── model.py
│
├── nnUNet/
│
├── nvidia_util/
│ ├── params.json
│ └── model_checkpoint.ckpt
│
├── main.py
│
└── README.md
```
## Installing Model Dependencies
To install the model dependencies and configure your environment, please run the setup.ipynb notebook provided in the repository. This notebook will handle the installation of necessary packages and configurations required for model inference.


## Usage

1. **Setup**: Clone the repository and navigate to the project directory.

2. **Run the Server**:
   - Ensure Python environment is set up with necessary dependencies installed.
   - Run the server using Uvicorn:
     ```bash
     uvicorn main:app --reload
     ```
     Uvicorn will start the server locally at `http://127.0.0.1:8000`.

3. **Perform Prediction**:
   - Prepare your data in the following structure
   ```
   data/
    └── BraTS2021_train/
        └── BraTS2021_xxxxx/
            ├── BraTS2021_xxxxx_flair.nii.gz
            ├── BraTS2021_xxxxx_t1.nii.gz
            ├── BraTS2021_xxxxx_t1ce.nii.gz
            └── BraTS2021_xxxxx_t2.nii.gz

   ```

   - Open your web browser and navigate to `http://127.0.0.1:8000/docs` after starting the server.
   - Send a POST request to http://localhost:8000/predict with JSON payload:

   ```json
   {
    "data_path": "/absolute/path/to/your/data"
   }
   ``` 
   -  Replace /absolute/path/to/your/data/BraTS2021_train/BraTS2021_xxxxx/ with the actual absolute path to your data directory.
   - The segmentation mask will be saved at the same directory





4. **Notes**:

- **BraTS2021_train/**: This directory should contain folders named after BraTS2021_xxxxx. Each patient folder should contain the following files:
  - `BraTS2021_xxxxx_flair.nii.gz`: FLAIR MRI sequence.
  - `BraTS2021_xxxxx_t1.nii.gz`: T1 MRI sequence.
  - `BraTS2021_xxxxx_t1ce.nii.gz`: T1-contrast-enhanced MRI sequence.
  - `BraTS2021_xxxxx_t2.nii.gz`: T2 MRI sequence.
- Make sure to adhere to the specified folder structure and naming conventions to ensure proper functioning of the segmentation server.


