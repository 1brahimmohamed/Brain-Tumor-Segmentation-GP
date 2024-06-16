from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import shutil
from app.model.model import segment


app = FastAPI()

@app.get("/")
def home():
    return {"segmentation server"}

class PredictionIn(BaseModel):
    data_path: str  # Assuming the client sends the path as a string

class PredictionOut(BaseModel):
    status: str

@app.post("/predict", response_model=PredictionOut)
def predict(data: PredictionIn):
    data_path = data.data_path  # Get the data_path from the request

    # Validate and process the data_path if needed
    if not os.path.isabs(data_path):
        raise HTTPException(status_code=400, detail="Invalid data_path: must be absolute")

    if not os.path.exists(data_path):
        raise HTTPException(status_code=404, detail=f"Data directory not found: {data_path}")

    # Construct paths based on the provided data_path

    BraTS2021_train_path = os.path.join(data_path,'BraTS2021_train')
    BraTS2021_train_folders = os.listdir(BraTS2021_train_path)
    base_filename = BraTS2021_train_folders[0]
    input_folder_path = os.path.join(BraTS2021_train_path, base_filename)
    output_directory =  os.path.abspath(data_path)

    # Delete all folders except BraTS2021_train
    for folder_name in os.listdir(output_directory):
        folder_path = os.path.join(output_directory, folder_name)
        if os.path.isdir(folder_path) and folder_name != 'BraTS2021_train':
            shutil.rmtree(folder_path)
            print(f"Deleted folder: {folder_path}")

    try:
        # Call your segmentation function with the updated input_folder_path and output_directory
        segment(input_folder_path, os.path.dirname(__file__), output_directory, os.path.basename(input_folder_path))
        # Delete all folders except BraTS2021_train
        for folder_name in os.listdir(output_directory):
            folder_path = os.path.join(output_directory, folder_name)
            if os.path.isdir(folder_path) and folder_name != 'BraTS2021_train':
                shutil.rmtree(folder_path)
                print(f"Deleted folder: {folder_path}")
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

    return {"status": 'success'}
