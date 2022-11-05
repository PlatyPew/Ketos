#!/usr/bin/python3
from flask import Flask, jsonify, request

import os
import subprocess
import platform

app = Flask(__name__)

IMAGE_NAME = "ketos-traffic-scanner"
CONTAINER_NAME = "ketos-scanner"
IMAGE_LOCATION = "images"


def run_cmd(cmd):
    out, err = subprocess.Popen(cmd,
                                env=os.environ.copy(),
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE).communicate()

    if err:
        err = err.decode().strip()
        raise Exception(err)

    return out.decode().strip()


def create_listener(container_hashes, arch):
    # Check if image exists
    if not run_cmd(["docker", "image", "ls", "-q", f"{IMAGE_NAME}:latest"]):
        run_cmd(["docker", "image", "load", "-i", f"{IMAGE_LOCATION}/{IMAGE_NAME}-{arch}.tgz"])

    run_cmd([
        "docker", "run", "-dit", "--network=host", "--name", CONTAINER_NAME, f"{IMAGE_NAME}:latest",
        "sh"
    ])

    results = dict()

    # Get interfaces
    for hashh in container_hashes:
        interfaces = run_cmd(["docker", "exec", hashh, "ls", "/sys/class/net/"]).split("\n")
        results[hashh] = list()
        for iface in interfaces:
            if "lo" not in iface:  # Check if not loopback
                results[hashh].append(iface)
                # Get host network interface
                iplink = run_cmd(["docker", "exec", hashh, "cat", f"/sys/class/net/{iface}/iflink"])

                # Start listener
                run_cmd(
                    ["docker", "exec", "-d", CONTAINER_NAME, "/listen.sh", hashh, iplink, iface])

    return results


def stop_listener():
    run_cmd(["docker", "stop", CONTAINER_NAME])


def delete_listener():
    run_cmd(["docker", "rm", "-f", CONTAINER_NAME])


def get_pcaps():
    run_cmd(["docker", "cp", f"{CONTAINER_NAME}:/opt/sniffer/captures", "."])


def _docker_socket():
    if os.getenv("DOCKER_HOST") is None:
        return False

    return True


@app.route('/socket', methods=['PUT'])
def update_socket():
    os.environ["DOCKER_HOST"] = request.args.get("dockerhost")

    return jsonify({"response": True})


@app.route('/capture', methods=['GET'])
def listen_traffic():
    if not _docker_socket():
        return jsonify({"response": "Docker Socket not initialised"}), 400

    try:
        hashes = request.args.getlist("id")
        arch = request.args.get("arch")

        if arch != "arm64" and arch != "amd64":
            if platform.machine() == 'aarch64':
                arch = 'arm64'
            else:
                arch = 'amd64'

        create_listener(hashes, arch)
        return jsonify({"response": True})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


@app.route('/result', methods=['GET'])
def grab_capture():
    if not _docker_socket():
        return jsonify({"response": "Docker Socket not initialised"}), 400

    try:
        stop_listener()
        get_pcaps()
        delete_listener()

        return jsonify({"response": True})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=6003)
