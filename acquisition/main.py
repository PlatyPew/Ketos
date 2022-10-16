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


def send_info(path, data):
    r = requests.post(f"{API_URL}{path}", json=data)
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


if __name__ == '__main__':
    main()
