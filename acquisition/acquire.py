#!/usr/bin/python3

from flask import Flask, jsonify, request

import subprocess
import os
import json
import requests
import shutil

API_URL = "http://restapi:3000/api"

app = Flask(__name__)


def error_msg():
    raise Exception("Something went wrong")


def run_cmd(cmd):
    out, err = subprocess.Popen(cmd,
                                env=os.environ.copy(),
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE).communicate()

    if err:
        print(err)
        error_msg()

    return out.decode().strip()


def get_info(cmd):
    if not (out := run_cmd(cmd)):
        error_msg()

    return json.loads(out)


def send_info(url_path, data, identifier=True):
    for entry in data:
        if identifier:
            if "sha256:" in entry["Id"]:
                iden = entry["Id"].split(":")[1]
            else:
                iden = entry["Id"]
        else:
            iden = entry["Name"]

        r = requests.put(f"{API_URL}{url_path}/{iden}", json=entry)
        if r.status_code != 200:
            error_msg()


def get_dockerfile(image_hashes):
    for iden in image_hashes:
        run_cmd(["./helper/getdockerfile", iden])


def send_dockerfile(url_path, dockerfile_path):
    r = requests.put(f"{API_URL}{url_path}", files={"file": open(dockerfile_path, 'r')})
    if r.status_code != 200:
        error_msg()


def get_logs(container_hashes):
    for iden in container_hashes:
        run_cmd(["./helper/getlogs", iden])


def get_diffs(container_hashes):
    diffs = []
    for iden in container_hashes:
        diff = run_cmd(["./helper/getdiff", iden])
        diffs.append(json.loads(diff))

    return diffs


def send_diffs(url_path, container_hash, diff):
    r = requests.put(f"{API_URL}{url_path}/{container_hash}", json=diff)
    if r.status_code != 200:
        error_msg()


def send_logs(url_path, log_path):
    r = requests.put(f"{API_URL}{url_path}", files={"file": open(log_path, 'r')})
    if r.status_code != 200:
        error_msg()


def get_image(image_hashes):
    for iden in image_hashes:
        run_cmd(["./helper/dumpimage", iden])


def get_container(container_hashes):
    for iden in container_hashes:
        run_cmd(["./helper/dumpcontainer", iden])


def send_file(url_path, image_path):
    r = requests.put(f"{API_URL}{url_path}", files={"file": open(image_path, 'rb')})
    if r.status_code != 200:
        error_msg()


def get_layers(image_hashes):
    layers = []
    for hashh in image_hashes:
        layer = run_cmd(["./helper/getlayers", f"{hashh}.tar.gz"])
        layers.append(json.loads(layer))

    return layers


def get_files(container_hashes):
    files = []
    for hashh in container_hashes:
        file = run_cmd(["./helper/getfilesystem", f"{hashh}.tar.gz"])
        files.append(json.loads(file))

    return files


def send_files(url_path, container_hash, file):
    r = requests.put(f"{API_URL}{url_path}/{container_hash}", json=file)
    if r.status_code != 200:
        error_msg()


def send_layers(url_path, image_hash, layers):
    r = requests.put(f"{API_URL}{url_path}/{image_hash}", json=layers)
    if r.status_code != 200:
        error_msg()


def acquire_info():
    # Sending info
    image_info = get_info(["./helper/listimage", "-a"])
    send_info("/image/info", image_info)
    print("Image info sent")

    container_info = get_info(["./helper/listcontainer", "-a"])
    send_info("/container/info", container_info)
    print("Container info sent")

    volume_info = get_info(["./helper/listvolume", "-a"])
    send_info("/volume/info", volume_info, False)
    print("Volume info sent")

    network_info = get_info(["./helper/listnetwork", "-a"])
    send_info("/network/info", network_info)
    print("Network info sent")

    # Send dockerfiles
    image_hashes = get_info(["./helper/listimage"])
    get_dockerfile(image_hashes)
    for hashh in image_hashes:
        send_dockerfile("/image/dockerfile", f"{hashh}.dockerfile")
    print("Image dockerfile sent")

    # Sending logs
    container_hashes = get_info(["./helper/listcontainer"])
    get_logs(container_hashes)
    for hashh in container_hashes:
        send_logs("/container/logs", f"{hashh}.log")
    print("Container logs sent")

    # Sending diffs
    diffs = get_diffs(container_hashes)
    for hashh, diff in zip(container_hashes, diffs):
        send_diffs("/container/diff", hashh, diff)
    print("Container diffs sent")

    # Sending image dumps
    get_image(image_hashes)
    for hashh in image_hashes:
        send_file("/image/fs", f"{hashh}.tar.gz")
    print("Image dumps sent")

    # Sending container dumps
    get_container(container_hashes)
    for hashh in container_hashes:
        send_file("/container/fs", f"{hashh}.tar.gz")
    print("Container dumps sent")

    # Sending image layers
    layers = get_layers(image_hashes)
    for hashh, layer in zip(image_hashes, layers):
        send_layers("/image/layer", hashh, layer)
    print("Imager layers sent")

    # Sending container filesystem
    files = get_files(container_hashes)
    for hashh, file in zip(container_hashes, files):
        send_files("/container/files", hashh, file)
    print("Container filesystem sent")

    # Clean files
    for hashh in image_hashes:
        os.remove(f"{hashh}.dockerfile")
        os.remove(f"{hashh}.tar.gz")
        shutil.rmtree(hashh)

    for hashh in container_hashes:
        os.remove(f"{hashh}.log")
        os.remove(f"{hashh}.tar.gz")

    print("Files cleaned")


@app.route('/acquire', methods=['GET'])
def start():
    if not _docker_socket:
        return jsonify({"response": "Docker Socket not initialised"}), 400

    try:
        acquire_info()
        return jsonify({"response": True})
    except:
        return jsonify({"response": False})


def _docker_socket():
    if os.getenv("DOCKER_HOST") is None:
        return False

    return True


@app.route('/socket', methods=['PUT'])
def update_socket():
    os.environ["DOCKER_HOST"] = request.args.get("dockerhost")

    return jsonify({"response": True})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
