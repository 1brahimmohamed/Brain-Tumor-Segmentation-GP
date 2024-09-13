from py3.10-torchl1.9.4-monai

WORKDIR /app

# Set the working directory in the container
WORKDIR /usr/app

# Copy the current directory contents into the container at /app
COPY . /usr/app


EXPOSE 8000


CMD ["python", "./app/model/setup.py"]