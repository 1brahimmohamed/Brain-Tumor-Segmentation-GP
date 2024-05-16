from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_v1_router
from app.core.config import settings
from pathlib import Path

# Create the FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1"
)

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the directory where uploaded files will be saved
UPLOAD_DIR = Path(settings.UPLOADS_DIR)
# Ensure the upload directory exists, create it if it doesn't
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@app.get("/")
async def read_root():
    """
    :return:
    """
    return {
        "Welcome to": "Nifti Storage Service",
        "Made by": "Ibrahim Mohamed",
        "At": "Systems and Biomedical Engineering Department, Cairo University",
        "For": "Graduation Project Thesis",
    }


# Include the API V1 routes
app.include_router(api_v1_router)
