// Create express router
const express = require("express");
const router = express.Router();

const insert = require("../utils/insertinfo");
const get = require("../utils/getinfo");

/**
 * Get data for frontend
 */
// List all volume ids
router.get("/id", async (_, res) => {
    res.setHeader("Content-Type", "application/json");

    try {
        const out = await get.getVolumeIDs();
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get volume info
router.get("/info/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getVolumeInfoAll(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Insert volume inspected info
router.post("/info/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await insert.insertVolume(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

module.exports = router;
