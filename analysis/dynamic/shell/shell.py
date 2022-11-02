#!/usr/bin/python3
from flask import Flask, jsonify, request

import os
import sys
import signal

app = Flask(__name__)


def start_shell(container_hash, shell="sh"):
    pid = os.fork()
    if pid == 0:
        os.system(' '.join([
            f"socat exec:'docker exec -it {container_hash} {shell}',pty,stderr,setsid,sigint,sane",
            "tcp-l:2323,reuseaddr"
        ]))

        sys.exit()


def die_shell():
    os.system("killall socat")


@app.route('/kill', methods=['GET'])
def kill_shell():
    try:
        die_shell()
        return jsonify({"response": True})
    except Exception as e:
        return jsonify({"response": str(e)}), 500


@app.route('/shell', methods=['GET'])
def get_shell():
    if not _docker_socket:
        return jsonify({"response": "Docker Socket not initialised"}), 400

    try:
        iden = request.args.get("id")
        die_shell()
        start_shell(iden)
        return jsonify({"response": True})
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
    app.run(host="0.0.0.0", port=6002)
