#!/usr/bin/python3

from flask import Flask, jsonify, request

import subprocess
import os
import json
import requests

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
        error_msg()

    return out.decode().strip()


def vuln_scan(iden):
    image_id = run_cmd(
        ["docker", "image", "ls", "--no-trunc", "--format", "{{.ID}}\t{{.Repository}}:{{.Tag}}"])

    image_id = image_id.split("\n")

    image_name = ""
    for entry in image_id:
        hashh, name = entry.split("\t")
        if hashh[7:] == iden:
            image_name = name

    if image_name == "":
        error_msg()

    scan = run_cmd(
        ["docker-scan", "scan", "--severity=high", "--json", "--group-issues", image_name])
    scan = json.loads(scan)

    r = requests.put(f"{API_URL}/static/vuln/{iden}", json=scan)
    if r.status_code != 200:
        error_msg()


@app.route('/vulnscan', methods=['GET'])
def start():
    if not _docker_socket:
        return jsonify({"response": "Docker Socket not initialised"}), 400

    try:
        iden = request.args.get("id")
        vuln_scan(iden)
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
    app.run(host="0.0.0.0", port=5002)
