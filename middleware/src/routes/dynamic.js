const express = require("express");
const router = express.Router();
const axios = require("axios");

const { PROCESS, SHELL } = require("../utils/ip");

router.get("/process/:id", async (req, res) => {
    const id = req.params.id;

    const [ps, stat] = await Promise.all([
        axios.get(`http://${PROCESS}/ps`, { params: { id: id } }),
        axios.get(`http://${PROCESS}/stat`, { params: { id: id } }),
    ]);

    let info = stat.data.response;
    info["processes"] = ps.data.response;

    res.json({ response: info });
});

router.get("/shell/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await axios.get(`http://${SHELL}/shell`, { params: { id: id } });
        res.json({ response: "Telnet service running on port 2323" });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

module.exports = router;
