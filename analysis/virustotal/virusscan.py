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
    data = json.loads(r.text)["data"]["attributes"]

    if r.status_code != 200:
        return False

    return data


def get_file_report(file_content):
    r = requests.post(f"{URL}/files", files={"file": file_content}, headers=headers)
    iden = json.loads(r.text)["data"]["id"]

    status = False

    while status != "completed":
        sleep(5)
        r = requests.post(f"{URL}/analyses/{iden}", headers=headers)
        status = json.loads(r.text)["data"]["attributes"]["status"]

    hashh = json.loads(r.text)["meta"]["file_info"]["sha256"]

    return get_hash_report(hashh)
