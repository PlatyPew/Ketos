// Create express router
const express = require("express");
const router = express.Router();
const axios = require("axios");

const get = require("../utils/getinfo");

const { SNYK, TRAFFIC } = require("../utils/ip");

// Start snyk analysis
router.put("/vuln/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");

    const out = await axios.get(`http://${SNYK}/vulnscan`, { params: { id: id } });
    res.json(out.data);
});

// Start live capture
router.put("/capture/start", async (req, res) => {
    const arch = req.query.arch;

    res.setHeader("Content-Type", "application/json");

    try {
        const containerIDs = await get.getContainerIDs();
        const out = await axios.get(
            `http://${TRAFFIC}/capture?arch=${arch}&${containerIDs.map((n) => `id=${n}`).join("&")}`
        );
        res.json(out.data);
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Stop live capture
router.put("/capture/stop", async (_, res) => {
    res.setHeader("Content-Type", "application/json");

    try {
        const out = await axios.get(`http://${TRAFFIC}/result`);
        res.json(out.data);
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

module.exports = router;
