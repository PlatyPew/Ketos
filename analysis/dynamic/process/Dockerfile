FROM python:3.10-bullseye

ENV DOCKER_VERSION 20.10.9
ENV DOCKER_SCAN_VERSION v0.21.0

WORKDIR /opt/analysis

RUN apt-get update && apt-get install curl -y && apt-get clean

RUN curl -fsSLO https://download.docker.com/linux/static/stable/$(uname -m)/docker-${DOCKER_VERSION}.tgz && \
    tar xzvf docker-${DOCKER_VERSION}.tgz --strip 1 -C /usr/bin docker/docker && \
    rm docker-${DOCKER_VERSION}.tgz

COPY ./requirements.txt .
COPY ./process.py .

RUN pip install -r requirements.txt

EXPOSE 6001

CMD ["python3", "process.py"]
