#!/bin/bash
cd $(dirname $0)

docker compose kill
docker compose down
docker volume rm ketos_ketos-db-volume
rm -rf middleware/dockerdata
