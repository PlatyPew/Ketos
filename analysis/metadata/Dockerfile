FROM python:3.10-bullseye

WORKDIR /opt/analysis

COPY ./requirements.txt .
COPY ./metadata.py .

RUN pip install -r requirements.txt && mkdir tmp

EXPOSE 5000

CMD ["python3", "metadata.py"]
