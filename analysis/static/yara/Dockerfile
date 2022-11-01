FROM golang:bullseye as build

RUN apt-get update && \
    apt-get install autoconf libtool autoconf libjansson-dev libmagic-dev -y

WORKDIR /src

RUN wget https://github.com/VirusTotal/yara/archive/refs/tags/v4.1.0.tar.gz && \
    mkdir yara && cd yara && tar xf ../v4.1.0.tar.gz && \
    cd yara-4.1.0/ && ./bootstrap.sh && \
    ./configure --enable-cuckoo --enable-magic --enable-dotnet && make && make install && ldconfig

RUN git clone --depth=1 https://github.com/EFForg/yaya.git && cd yaya && \
    go build

FROM python:3-bullseye

RUN apt-get update && apt-get install yara libjansson-dev libmagic-dev -y && apt-get clean

COPY --from=build /src/yaya/yaya /usr/bin/yaya
COPY --from=build /src/yara/yara-4.1.0 /src

RUN cd /src && make install && ldconfig && rm -rf /src
RUN yaya update

WORKDIR /opt/yara

COPY ./requirements.txt .
COPY ./yara.py .

RUN pip install -r requirements.txt && mkdir tmp

EXPOSE 5004

CMD ["python3", "yara.py"]
