# Use the official Python image
FROM python:3.11-slim

# Install build tools and PostgreSQL development package
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /usr/src/app

COPY requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy your application code into the container
COPY . .

EXPOSE 9000

# Run main.py when the container launches
CMD ["python", "main.py"]

