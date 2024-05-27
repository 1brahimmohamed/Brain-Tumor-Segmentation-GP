# Orthanc (DICOM Server) Service

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [References](#references)

## Overview
Orthanc is a lightweight, RESTful DICOM server for healthcare and medical research. It is easy to use and can be deployed in a few minutes. Orthanc is a free and open-source software that is licensed under the GNU General Public License.

## Prerequisites
There are 2 ways to run the Orthanc on your machine:

1. Install it on your machine from the official website: [Orthanc](https://www.orthanc-server.com/download.php)
2. Use Docker (Recommended for this project)
   - Docker

### In This Project we use
- Orthanc version: 1.12.1
- Orthanc Plugins:
    - ServeFolders
    - ModalityWorklist
    - DicomWeb
    - WebViewer
    - OrthancNeuro
    - PostgresqlIndex
    - PostgresqlStorage

All is handled by the Dockerfile but you will need to install them if you are not using the Docker.

## Installation
1. Clone the repository

You can run it alone using only the docker file

2.1. navigate to the directory where the Dockerfile is located
```bash
cd Software/backend/Services/Orthanc
```
2.2. Build the docker image
```bash
docker build -t orthanc .
```
2.3. Run the docker image
```bash
docker run -d -p 4242:4242 8042:8042 orthanc
```

or you can use the docker-compose file
3.1. navigate to the directory where the docker-compose file is located
```bash
cd Software
```
3.2. Run the docker-compose file
```bash
docker-compose up orthanc
```

## Configuration
The Orthanc server can be configured by editing the configuration file located at 
`Software/backend/Services/Orthanc/orthanc.json`. The configuration file is a JSON file that contains the configuration 
settings for the Orthanc server. You can edit the configuration file to customize the server settings according to your
requirements.


We also use DICOM-Web alongside Orthanc APIs to provide a RESTful interface for the DICOM server. 
The DICOM-Web plugin can be configured by editing the configuration file located at 
`Software/backend/Services/Orthanc/dicomweb.json`. 

For more information on how to configure the Orthanc server, please refer to the official documentation: [Orthanc Configuration](https://book.orthanc-server.com/users/configuration.html)


## References
- [Orthanc Official Website](https://www.orthanc-server.com/)
- [Orthanc Book](https://orthanc.uclouvain.be/book/)
