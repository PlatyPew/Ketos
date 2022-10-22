// Create express router
const express = require("express");
const router = express.Router();

const info = require("../utils/insertinfo");

// Insert volume inspected info
router.post("/info/insert/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await info.insertVolume(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

module.exports = router;
