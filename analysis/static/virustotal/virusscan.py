#!/usr/bin/python3
from flask import Flask, jsonify, request

from time import sleep

import requests
import json
import os

URL = "https://www.virustotal.com/api/v3"
API_KEY = os.getenv("VIRUSTOTAL_API_KEY")

headers = {"accept": "application/json", "x-apikey": API_KEY}

app = Flask(__name__)


def get_hash_report(hashh):
    r = requests.get(f"{URL}/files/{hashh}", headers=headers)

    if r.status_code != 200:
        return False

    data = json.loads(r.text)["data"]["attributes"]

    return data


def get_file_report(file_content):
    r = requests.post(f"{URL}/files", files={"file": file_content}, headers=headers)
    iden = json.loads(r.text)["data"]["id"]

    status = False

    while status != "completed":
        sleep(3)
        r = requests.get(f"{URL}/analyses/{iden}", headers=headers)
        status = json.loads(r.text)["data"]["attributes"]["status"]

    hashh = json.loads(r.text)["meta"]["file_info"]["sha256"]

    data = get_hash_report(hashh)

    return data


@app.route('/hashscan', methods=['GET'])
def hash_scan():
    try:
        hashh = request.args.get("hashsum")
        if (result := get_hash_report(hashh)) is False:
            return jsonify({"response": None})

        return jsonify({"response": result})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


@app.route('/filescan', methods=['POST'])
def file_scan():
    try:
        file_content = request.files.get('filecontent').read()
        if (result := get_file_report(file_content)) is False:
            return jsonify({"response": None})

        return jsonify({"response": result})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003)
