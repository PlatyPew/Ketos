#!/usr/bin/python3
from flask import Flask, jsonify, request, send_file

import hashlib
import tarfile
import os
import magic
import shutil
import subprocess
import csv

TMP_LOC = "./tmp"
CONTAINER_DATA = "./dockerdata/container"
app = Flask(__name__)


def _extract(iden):
    with tarfile.open(f"{CONTAINER_DATA}/{iden}.tar.gz", "r:gz", dereference=True) as tar:
        tar.extractall(f"{TMP_LOC}/{iden}")


def get_strings(iden, file_path):
    loc = f"{TMP_LOC}/{iden}"
    if not os.path.exists(loc):
        _extract(iden)

    file_path = f"{loc}/{file_path}"

    if not os.path.exists(file_path):
        return None

    out, err = subprocess.Popen(
        ["strings", file_path],
        env=os.environ.copy(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    ).communicate()

    if err:
        return None

    return out.decode().strip()


def get_file_loc(iden, file_path):
    loc = f"{TMP_LOC}/{iden}"
    if not os.path.exists(loc):
        _extract(iden)

    file_path = f"{loc}/{file_path}"

    if not os.path.exists(file_path):
        return None

    return file_path


def get_hash(iden, file_path):
    loc = f"{TMP_LOC}/{iden}"
    if not os.path.exists(loc):
        _extract(iden)

    file_path = f"{loc}/{file_path}"

    if not os.path.exists(file_path):
        return None

    with open(file_path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()


def get_type(iden, file_path):
    loc = f"{TMP_LOC}/{iden}"
    if not os.path.exists(loc):
        _extract(iden)

    file_path = f"{loc}/{file_path}"

    if not os.path.exists(file_path):
        return None

    return magic.from_file(file_path)


@app.route('/clean', methods=['GET'])
def clean():
    try:
        for f in os.listdir(TMP_LOC):
            shutil.rmtree(f"{TMP_LOC}/{f}")

        return jsonify({"response": True})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


@app.route('/strings', methods=['GET'])
def strings():
    try:
        iden = request.args.get("id")
        file_path = request.args.get("file")

        if (strings := get_strings(iden, file_path)) is None:
            return jsonify({"response": None})

        return jsonify({"response": strings})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


@app.route('/file', methods=['GET'])
def file():
    try:
        iden = request.args.get("id")
        file_path = request.args.get("file")
        if (file_loc := get_file_loc(iden, file_path)) is None:
            return jsonify({"response": "File not found"}), 400

        return send_file(file_loc)
    except Exception as e:
        return jsonify({"response": str(e)}), 500


@app.route('/hash', methods=['GET'])
def hash():
    try:
        iden = request.args.get("id")
        file_path = request.args.get("file")
        hashh = get_hash(iden, file_path)
        return jsonify({"response": hashh})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


@app.route('/type', methods=['GET'])
def type():
    try:
        iden = request.args.get("id")
        file_path = request.args.get("file")
        hashh = get_type(iden, file_path)
        return jsonify({"response": hashh})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


def _parse(data, strip=64):
    result = csv.reader(data.splitlines(), delimiter=",")
    next(result, None)

    final = dict()

    for entry in result:
        date = entry[0]
        size = int(entry[1])
        mode = entry[3]
        uid = int(entry[4])
        gid = int(entry[5])
        name = entry[7][strip + 1:]

        if mode[0] == "d":
            name += "/"

        final[name] = {
            'date': date,
            'size': size,
            'mode': mode,
            'uid': uid,
            'gid': gid,
        }

    return final


def get_macrobber(iden):
    if not os.path.exists(f"{TMP_LOC}/{iden}"):
        _extract(iden)

    out, err = subprocess.Popen(f"mac-robber {iden} | mactime -d -y",
                                env=os.environ.copy(),
                                cwd=TMP_LOC,
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE,
                                shell=True).communicate()

    if err:
        return None

    out = out.decode().strip()

    return _parse(out)


@app.route('/macrobber', methods=['GET'])
def macrobber():
    try:
        iden = request.args.get("id")
        if (macrobber := get_macrobber(iden)) is None:
            return jsonify({"response": "ID not found"}), 400

        return jsonify({"response": macrobber})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0")
