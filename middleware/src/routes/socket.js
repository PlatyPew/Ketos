const express = require("express");
const router = express.Router();
const axios = require("axios");

const { ACQUIRER, SNYK, PROCESS, SHELL, TRAFFIC } = require("../utils/ip");

router.put("/", async (req, res) => {
    const host = req.query.host;
    const port = req.query.port;

    const acquire = axios.put(`http://${ACQUIRER}/socket`, null, {
        params: { dockerhost: `${host}:${port}` },
    });

    const snyk = axios.put(`http://${SNYK}/socket`, null, {
        params: { dockerhost: `${host}:${port}` },
    });

    const process = axios.put(`http://${PROCESS}/socket`, null, {
        params: { dockerhost: `${host}:${port}` },
    });

    const shell = axios.put(`http://${SHELL}/socket`, null, {
        params: { dockerhost: `${host}:${port}` },
    });

    const traffic = axios.put(`http://${TRAFFIC}/socket`, null, {
        params: { dockerhost: `${host}:${port}` },
    });

    await Promise.all([acquire, snyk, process, shell, traffic]);

    res.setHeader("Content-Type", "application/json");

    try {
        res.json({ response: true });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

module.exports = router;
