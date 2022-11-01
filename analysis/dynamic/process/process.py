#!/usr/bin/python3

from flask import Flask, jsonify, request

import os
import subprocess
import json

app = Flask(__name__)


def get_processes(container_hash):
    out, err = subprocess.Popen(["docker", "container", "top", container_hash, "-ef"],
                                env=os.environ.copy(),
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE).communicate()
    if err:
        return None

    out = out.decode().strip().split("\n")[1:]

    processes = list()
    for entry in out:
        entry = [x for x in entry.split(" ") if x]

        processes.append({
            "uid": entry[0],
            "pid": int(entry[1]),
            "ppid": int(entry[2]),
            "cmd": " ".join(entry[7:])
        })

    return processes


def get_stats(container_hash):
    out, err = subprocess.Popen([
        "docker", "container", "stats", "--all", "--no-trunc", "--no-stream", "--format",
        "{{ json . }}", container_hash
    ],
                                env=os.environ.copy(),
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE).communicate()

    out = out.decode().strip()

    stats = json.loads(out)

    return {
        "pid": int(stats["PIDs"]),
        "block_io": stats["BlockIO"].split(" / ")[0],
        "mem_usage": stats["MemUsage"].split(" / ")[0],
        "mem_limit": stats["MemUsage"].split(" / ")[1],
        "net_io": stats["NetIO"].split(" / ")[0]
    }


@app.route('/ps', methods=['GET'])
def process():
    if not _docker_socket:
        return jsonify({"response": "Docker Socket not initialised"}), 400

    try:
        iden = request.args.get("id")
        processes = get_processes(iden)
        return jsonify({"response": processes})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


@app.route('/stat', methods=['GET'])
def stats():
    if not _docker_socket:
        return jsonify({"response": "Docker Socket not initialised"}), 400

    try:
        iden = request.args.get("id")
        stats = get_stats(iden)
        return jsonify({"response": stats})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


def _docker_socket():
    if os.getenv("DOCKER_HOST") is None:
        return False

    return True


@app.route('/socket', methods=['PUT'])
def update_socket():
    os.environ["DOCKER_HOST"] = request.args.get("dockerhost")

    return jsonify({"response": True})


if __name__ == '__main__':
    app.run(host="0.0.0.0")
