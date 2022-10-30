#!/usr/bin/python3
from flask import Flask, jsonify, request

from datetime import datetime

import requests
import json
import os

URL = "https://www.virustotal.com/api/v3/files"
API_KEY = os.getenv("VIRUSTOTAL_API_KEY")

headers = {"accept": "application/json", "x-apikey": API_KEY}

app = Flask(__name__)


def get_hash_report(hashh):
    r = requests.get(f"{URL}/{hashh}", headers=headers)
    data = json.loads(r.text)["data"]["attributes"]

    analysis = {
        "creationdate": datetime.fromtimestamp(data["creation_date"]).isoformat(),
        "firstseendate": datetime.fromtimestamp(data["first_seen_itw_date"]).isoformat(),
        "analysis": {
            "result": data["last_analysis_results"],
            "stats": data["last_analysis_stats"],
        },
        "name": {
            "actual": data["meaningful_name"],
            "others": data["names"],
        },
        "packers": data["packers"],
        "threatclassification": data["popular_threat_classification"],
        "type": {
            "description": data["type_description"],
            "extension": data["type_extension"],
            "magic": data["magic"],
        }
    }

    return analysis
