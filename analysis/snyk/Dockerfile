FROM python:3.10-bullseye

ENV DOCKER_VERSION 20.10.9
ENV DOCKER_SCAN_VERSION v0.21.0

WORKDIR /opt/analysis

RUN apt-get update && apt-get install curl -y && apt-get clean

RUN curl -fsSLO https://download.docker.com/linux/static/stable/$(uname -m)/docker-${DOCKER_VERSION}.tgz && \
    tar xzvf docker-${DOCKER_VERSION}.tgz --strip 1 -C /usr/bin docker/docker && \
    rm docker-${DOCKER_VERSION}.tgz

RUN if [ "$(uname -m)" = "aarch64" ]; then \
        curl -fsSL https://github.com/docker/scan-cli-plugin/releases/download/${DOCKER_SCAN_VERSION}/docker-scan_linux_arm64 \
            -o /usr/local/bin/docker-scan ; \
        curl -fsSL https://static.snyk.io/cli/latest/snyk-linux-arm64 \
            -o /usr/local/bin/snyk ; \
    else \
        curl -fsSL https://github.com/docker/scan-cli-plugin/releases/download/${DOCKER_SCAN_VERSION}/docker-scan_linux_amd64 \
            -o /usr/local/bin/docker-scan ; \
        curl -fsSL https://static.snyk.io/cli/latest/snyk-linux \
            -o /usr/local/bin/snyk ; \
    fi && \
    chmod +x /usr/local/bin/docker-scan && \
    chmod +x /usr/local/bin/snyk

COPY ./requirements.txt .
COPY ./vulnscan.py .
COPY ./entrypoint.sh /

RUN pip install -r requirements.txt

ENTRYPOINT ["/entrypoint.sh"]
