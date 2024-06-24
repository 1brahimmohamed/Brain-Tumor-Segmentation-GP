from fastapi import FastAPI, Depends
from app.model import Base
from app.config import engine
from app.router import router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router, prefix="/report", tags=["Report"])
