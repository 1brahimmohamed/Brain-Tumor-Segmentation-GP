# Use the official Ubuntu 20.04 LTS image as the base image
FROM ubuntu:20.04

# Update the package repository and install required packages
RUN apt update
RUN apt install -y orthanc 
RUN apt install -y orthanc-dicomweb 
RUN apt install -y orthanc-imagej 
RUN apt install -y orthanc-mysql 
RUN apt install -y orthanc-postgresql 
RUN apt install -y orthanc-webviewer 
RUN apt install -y orthanc-wsi 
RUN apt install -y nano

# Expose the default Orthanc port (4242) if needed
EXPOSE 4242

# Expose the Https server 
EXPOSE 8042

# Start the Orthanc service
# CMD ["service", "orthanc", "start"]

CMD ["/usr/share/orthanc/scripts/initial_script.sh"]