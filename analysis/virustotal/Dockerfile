FROM python:3.10-bullseye

WORKDIR /opt/analysis

COPY ./requirements.txt .
COPY ./virusscan.py .

RUN pip install -r requirements.txt

EXPOSE 5003

CMD ["python3", "virusscan.py"]
