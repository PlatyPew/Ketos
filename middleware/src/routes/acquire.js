// Create express router
const express = require("express");
const router = express.Router();
const axios = require("axios");

const { ACQUIRER } = require("../utils/ip");

// Start acquisition
router.put("/", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const out = await axios.get(`http://${ACQUIRER}/acquire`);
    res.json(out.data);
});

module.exports = router;
