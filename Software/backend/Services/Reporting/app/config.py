from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve environment variables
POSTGRES_REPORT_DB = os.getenv('POSTGRES_REPORT_DB')
POSTGRES_REPORT_USER = os.getenv('POSTGRES_REPORT_USER')
POSTGRES_REPORT_PASSWORD = os.getenv('POSTGRES_REPORT_PASSWORD')
POSTGRES_REPORT_HOST = os.getenv('POSTGRES_REPORT_HOST')
POSTGRES_REPORT_PORT = os.getenv('POSTGRES_REPORT_PORT')

# Construct the database URL
DATABASE_URL = f'postgresql://{POSTGRES_REPORT_USER}:{POSTGRES_REPORT_PASSWORD}@{POSTGRES_REPORT_HOST}:{POSTGRES_REPORT_PORT}/{POSTGRES_REPORT_DB}'

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
