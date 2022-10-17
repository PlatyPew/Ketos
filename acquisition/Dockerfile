FROM python:3.10-bullseye

ENV DOCKER_VERSION 20.10.9

WORKDIR /opt/acquisition

RUN curl -fsSLO https://download.docker.com/linux/static/stable/$(uname -m)/docker-${DOCKER_VERSION}.tgz && \
    tar xzvf docker-${DOCKER_VERSION}.tgz --strip 1 -C /usr/local/bin docker/docker && \
    rm docker-${DOCKER_VERSION}.tgz

COPY ./requirements.txt .
COPY ./acquire .
COPY ./helper/ ./helper/
COPY ./bin/ ./bin/
