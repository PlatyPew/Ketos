FROM python:3.10-alpine

ENV DOCKER_VERSION 20.10.9

WORKDIR /opt/analysis

RUN apk add --no-cache curl socat

RUN curl -fsSLO https://download.docker.com/linux/static/stable/$(uname -m)/docker-${DOCKER_VERSION}.tgz && \
    tar xzvf docker-${DOCKER_VERSION}.tgz --strip 1 -C /usr/bin docker/docker && \
    rm docker-${DOCKER_VERSION}.tgz

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY ./shell.py .

EXPOSE 6002

CMD ["python3", "shell.py"]
