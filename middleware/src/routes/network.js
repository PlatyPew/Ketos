// Create express router
const express = require("express");
const router = express.Router();

const insert = require("../utils/insertinfo");
const get = require("../utils/getinfo");

/**
 * Get data for frontend
 */
// List all network ids
router.get("/id", async (_, res) => {
    res.setHeader("Content-Type", "application/json");

    try {
        const out = await get.getNetworkIDs();
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get network info
router.get("/info/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getNetworkInfoAll(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Insert network inspected info
router.post("/info/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await insert.insertNetwork(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

module.exports = router;
