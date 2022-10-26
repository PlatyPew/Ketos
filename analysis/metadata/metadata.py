#!/usr/bin/python3
from flask import Flask, jsonify, request

import hashlib
import tarfile
import subprocess
import os
import random
import string
import shutil

TMP_LOC = "./tmp"
CONTAINER_DATA = "./dockerdata/container"
app = Flask(__name__)


def _fix_link(iden, file_path):
    loc = ''.join(random.choice(string.ascii_lowercase) for _ in range(24))

    def _extract():
        subprocess.Popen(
            ["tar", "-xzf", f"{CONTAINER_DATA}/{iden}.tar.gz", "-C", f"{TMP_LOC}/{loc}", file_path],
            env=os.environ.copy(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        ).communicate()

    os.makedirs(f"{TMP_LOC}/{loc}")

    _extract()

    extracted_file = f"{TMP_LOC}/{loc}/{file_path}"

    while os.path.islink(extracted_file):
        file_path = os.path.realpath(extracted_file)[1:]
        extracted_file = f"{TMP_LOC}/{loc}/{file_path}"
        _extract()

    with open(extracted_file, "rb") as f:
        data = f.read()

    shutil.rmtree(f"{TMP_LOC}/{loc}")

    return data


def _get_file(iden, file_path):
    with tarfile.open(f"{CONTAINER_DATA}/{iden}.tar.gz", "r:gz") as tar:
        if int(tar.getmember(file_path).type) != 0:
            return _fix_link(iden, file_path)

        with tar.extractfile(file_path) as f:
            return f.read()


def get_hash(iden, file_path):
    data = _get_file(iden, file_path)
    return hashlib.sha256(data).hexdigest()


@app.route('/hash', methods=['GET'])
def hash():
    try:
        iden = request.args.get("id")
        file_path = request.args.get("file")
        hashh = get_hash(iden, file_path)
        return jsonify({"response": hashh})
    except KeyError:
        return jsonify({"response": "Soft Link"}), 400
    except Exception as e:
        return jsonify({"response": e}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0")
