// Create express router
const express = require("express");
const router = express.Router();
const axios = require("axios");

const SNYK = "snyk:5000";

// Start snyk analysis
router.get("/vuln/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");

    const out = await axios.get(`http://${SNYK}/vulnscan`, { params: { id: id } });
    res.json(out.data);
});

module.exports = router;
