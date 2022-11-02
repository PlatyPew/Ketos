FROM python:3-alpine

ENV DOCKER_VERSION 20.10.9

WORKDIR /opt/traffic

RUN apk add --no-cache curl

RUN curl -fsSLO https://download.docker.com/linux/static/stable/$(uname -m)/docker-${DOCKER_VERSION}.tgz && \
    tar xzvf docker-${DOCKER_VERSION}.tgz --strip 1 -C /usr/local/bin docker/docker && \
    rm docker-${DOCKER_VERSION}.tgz

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY traffic.py .

EXPOSE 6003

CMD ["python3", "traffic.py"]
