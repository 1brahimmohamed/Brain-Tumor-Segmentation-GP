# Use the official Ubuntu 20.04 LTS image as the base image
FROM ubuntu:20.04

# Update the package repository and install required packages
RUN apt-get update
RUN apt install -y orthanc
RUN apt install -y nano
RUN apt install -y wget

# Install the latest version of Orthanc from LSB packages
RUN wget https://orthanc.uclouvain.be/downloads/linux-standard-base/orthanc/1.12.1/Orthanc --output-document /usr/sbin/Orthanc
RUN chmod +x /usr/sbin/Orthanc

# remove the default plugins and download the latest version of the plugins
RUN rm -f /usr/share/orthanc/plugins/*.so
RUN wget https://orthanc.uclouvain.be/downloads/linux-standard-base/orthanc/1.12.1/libServeFolders.so --output-document /usr/share/orthanc/plugins/libServeFolders.so
RUN wget https://orthanc.uclouvain.be/downloads/linux-standard-base/orthanc/1.12.1/libModalityWorklists.so --output-document /usr/share/orthanc/plugins/libModalityWorklists.so
RUN wget https://orthanc.uclouvain.be/downloads/linux-standard-base/orthanc-dicomweb/1.15/libOrthancDicomWeb.so --output-document /usr/share/orthanc/plugins/libOrthancDicomWeb.so
RUN wget https://orthanc.uclouvain.be/downloads/linux-standard-base/orthanc-neuro/1.0/libOrthancNeuro.so --output-document /usr/share/orthanc/plugins/libOrthancNeuro.so
RUN wget https://orthanc.uclouvain.be/downloads/linux-standard-base/orthanc-webviewer/2.8/libOrthancWebViewer.so --output-document /usr/share/orthanc/plugins/libOrthancWebViewer.so
RUN wget https://orthanc.uclouvain.be/downloads/linux-standard-base/orthanc-postgresql/5.1/libOrthancPostgreSQLIndex.so --output-document /usr/share/orthanc/plugins/libOrthancPostgreSQLIndex.so
RUN wget https://orthanc.uclouvain.be/downloads/linux-standard-base/orthanc-postgresql/5.1/libOrthancPostgreSQLStorage.so --output-document /usr/share/orthanc/plugins/libOrthancPostgreSQLStorage.so


# Expose the default Orthanc port (4242) if needed
EXPOSE 4242

# Expose the Https server
EXPOSE 8042

## Start Orthanc
CMD ["/usr/sbin/Orthanc", "/etc/orthanc/orthanc.json"]
