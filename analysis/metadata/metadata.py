#!/usr/bin/python3
from flask import Flask, jsonify, request

import hashlib
import tarfile

CONTAINER_DATA = "./dockerdata/container"
app = Flask(__name__)


def _get_file(iden, file_path):
    with tarfile.open(f"{CONTAINER_DATA}/{iden}.tar.gz", "r:gz") as tar:
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
