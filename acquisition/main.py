#!/usr/bin/env python3

import subprocess
import os
import sys
import json
import requests

API_URL = "http://localhost:3000/api"


def error_msg():
    print("Something went wrong", file=sys.stderr)
    sys.exit(1)


def run_cmd(cmd):
    out, err = subprocess.Popen(cmd,
                                env=os.environ.copy(),
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE).communicate()

    if err:
        return False

    return out.decode().strip()


def get_info(cmd):
    if not (out := run_cmd(cmd)):
        error_msg()

    return json.loads(out)


def send_info(url_path, data):
    r = requests.post(f"{API_URL}{url_path}", json=data)
    if r.status_code != 200:
        error_msg()


def get_image(image_hashes):
    for iden in image_hashes:
        run_cmd(["./helper/dumpimage", iden])


def get_container(container_hashes):
    for iden in container_hashes:
        run_cmd(["./helper/dumpcontainer", iden])


def send_file(url_path, image_path):
    r = requests.post(f"{API_URL}{url_path}", files={"file": open(image_path, 'rb')})
    if r.status_code != 200:
        error_msg()


def main():
    # Sending info
    info = get_info(["./helper/listimage", "-a"])
    send_info("/image/info/insert", info)

    info = get_info(["./helper/listcontainer", "-a"])
    send_info("/container/info/insert", info)

    info = get_info(["./helper/listvolume", "-a"])
    send_info("/volume/info/insert", info)

    info = get_info(["./helper/listnetwork", "-a"])
    send_info("/network/info/insert", info)

    # Sending image dumps
    info = get_info(["./helper/listimage"])
    get_image(info)
    for iden in info:
        send_file("/image/upload", f"{iden}.tar.gz")

    # Sending container dumps
    info = get_info(["./helper/listcontainer"])
    get_container(info)
    for iden in info:
        send_file("/container/upload", f"{iden}.tar.gz")


if __name__ == '__main__':
    main()
