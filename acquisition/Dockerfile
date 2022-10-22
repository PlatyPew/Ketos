FROM python:3.10-alpine

ENV DOCKER_VERSION 20.10.9

WORKDIR /opt/acquisition

RUN apk add --no-cache curl bash jq

RUN curl -fsSLO https://download.docker.com/linux/static/stable/$(uname -m)/docker-${DOCKER_VERSION}.tgz && \
    tar xzvf docker-${DOCKER_VERSION}.tgz --strip 1 -C /usr/local/bin docker/docker && \
    rm docker-${DOCKER_VERSION}.tgz

COPY ./requirements.txt .
COPY ./acquire .
COPY ./helper/ ./helper/

RUN pip install -r requirements.txt && \
    ln -sf /usr/local/bin/python3 /usr/bin/python3

EXPOSE 5000

CMD ["python3", "acquire"]
