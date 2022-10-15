// Create express router
const express = require("express");
const router = express.Router();

const info = require("../utils/insertinfo");

// Insert network inspected info
router.post("/insert", async (req, res) => {
    const data = req.body;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await info.insertNetwork(data);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

module.exports = router;
