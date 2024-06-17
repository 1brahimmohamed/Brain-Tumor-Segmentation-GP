FROM py310_tf215

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y dcm2niix

COPY . .

CMD [ "python", "connection.py"]