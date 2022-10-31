#!/usr/bin/python3
from flask import Flask, jsonify, request

import json
import subprocess
import os
import random
import string

YAYA_FILE = "/tmp/yaya.json"
TMP_LOC = "./tmp"
app = Flask(__name__)


def run_scan(file_path):
    subprocess.Popen(
        ["yaya", "scan", file_path],
        env=os.environ.copy(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    ).communicate()

    with open(YAYA_FILE, "r") as f:
        data = json.loads(f.read())

    data = data[list(data.keys())[0]]

    final = []

    for entry in data:
        data = {}
        data["rule"] = entry["Rule"]
        data["namespace"] = entry["Namespace"]
        data["tags"] = entry["Tags"]

        if entry["Metas"] is not None:
            for meta in entry["Metas"]:
                if "desc" in meta["Identifier"]:
                    data["description"] = meta["Value"]
                    break

        final.append(data)

    return final


def _write_file(file_content):
    file_path = ''.join(random.choice(string.ascii_lowercase) for _ in range(8))
    file_path = f"{TMP_LOC}/{file_path}"
    with open(file_path, "wb") as f:
        f.write(file_content)

    return file_path


@app.route('/filescan', methods=['POST'])
def file_scan():
    try:
        file_content = request.files.get('filecontent').read()
        file_path = _write_file(file_content)
        result = run_scan(file_path)
        os.remove(file_path)

        return jsonify({"response": result})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0")
