#!/usr/bin/env bash

if [[ -z "${1}" ]]; then
    >&2 echo "Please input tcp socket to connect to"
    exit 1
fi

docker run -it --rm -e DOCKER_HOST="tcp://${1}" acquisition ./acquire
