const express = require("express");
const router = express.Router();
const axios = require("axios");

const { ACQUIRER, SNYK } = require("../utils/ip");

router.put("/", async (req, res) => {
    const host = req.query.host;
    const port = req.query.port;

    const acquire = axios.put(`http://${ACQUIRER}/socket`, null, {
        params: { dockerhost: `${host}:${port}` },
    });

    const snyk = axios.put(`http://${SNYK}/socket`, null, {
        params: { dockerhost: `${host}:${port}` },
    });

    await Promise.all([acquire, snyk]);

    res.setHeader("Content-Type", "application/json");

    try {
        res.json({ response: true });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

module.exports = router;
