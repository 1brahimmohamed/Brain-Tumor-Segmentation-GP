# Nifti Storage Service

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Run the Project](#Run-the-Project)
- [References](#references)


## Overview
Nifti Storage Service is a lightweight, RESTful Nifti server for storage and retrieval of Nifti files. 
It is easy to use and can be deployed in a few minutes. It's Based on Brain Imaging Data Structure (BDIS) Standards.

### What is BDIS
The Brain Imaging Data Structure is a standard for organizing, annotating, and describing data collected during 
neuroimaging experiments. It is based on a formalized file and directory structure and metadata files with controlled vocabulary.

[Learn More About BDIS](https://bids.neuroimaging.io/)


## Features
- Store Nifti files
- Retrieve Nifti files
- Delete Nifti files
- List all Nifti files in the server
- List all Nifti Subjects in a specific Project
- List all Nifti Sequences files in a specific Subject

## Prerequisites
There are 2 ways to run the Nifti Storage on your machine:

1. Run it from this directory
   - FastAPI
   - Uvicorn
2. Use Docker (Recommended for this project)
    - Docker


## Run the Project
1. Clone the repository

### Run it from this directory
2.  navigate to the directory where the Dockerfile is located
```bash
cd Software/backend/Services/NiftiStorage
```
3. create a virtual environment
```bash
python -m venv venv
```
4. activate the virtual environment
```bash
source venv/bin/activate (linux)
venv\Scripts\activate (windows)
```
5. Install the requirements
```bash
pip install -r requirements.txt
```
6.Run the server
```bash
python main.py
```

### Use Docker
#### Using Docker only
2. Build the docker image
```bash
docker build -t nifti .
```
3. Run the docker image 
```bash
docker run -d -p 8000:8000 nifti
```
#### Using Docker Compose
2. navigate to the directory where the docker-compose file is located
3. Run the docker-compose file
```bash
docker-compose up nifti_storage
```

## Technologies & Tools
This Project is Built with
<div>
<img style="margin-right: 1rem" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg"  alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg"  alt="cpp" width="50" height="50" />
</div>

## References
- [Brain Imaging Data Structure](https://bids.neuroimaging.io/)
- [BDIS Starter Kit](https://bids-standard.github.io/bids-starter-kit/)
- [FastAPI](https://fastapi.tiangolo.com/)


