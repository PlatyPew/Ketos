FROM python:3.10-bullseye

WORKDIR /opt/analysis

COPY ./requirements.txt .
COPY ./metadata.py .

RUN apt-get update && apt-get install mac-robber sleuthkit -y && apt-get clean && \
    pip install -r requirements.txt && mkdir tmp

EXPOSE 5001

CMD ["python3", "metadata.py"]
