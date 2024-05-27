from pydantic import BaseSettings, AnyHttpUrl
from decouple import config


class Settings(BaseSettings):
    """
    Settings class to store all the configurations for the application

    """
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = config('DATABASE_URL')
    UPLOADS_DIR: str = config('UPLOADS_FOLDER')
    PROJECT_NAME: str = 'Nifti Storage Service'
    BACKEND_CORS_ORIGINS: str = '*'

    class Config:
        case_sensitive = True


settings = Settings()
