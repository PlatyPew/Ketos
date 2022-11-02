const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");

const { PROCESS, SHELL } = require("../utils/ip");

const CAPTURES = "./captures";

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

router.get("/capture/id", async (_, res) => {
    try {
        const files = fs.readdirSync(CAPTURES);

        let ids = {};
        files.forEach((file) => {
            const name = file.split("-");
            const id = name[0];
            const iface = name[1].slice(0, -5);

            if (!(id in ids)) ids[id] = [];
            ids[id].push(iface);
        });

        res.json({ response: ids });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

router.get("/capture/:id/:iface", async (req, res) => {
    const id = req.params.id;
    const iface = req.params.iface;

    const filename = `${CAPTURES}/${id}-${iface}.pcap`;

    if (fs.existsSync(filename)) res.download(filename);
    else res.status(400).json({ response: "File not found" });
});

module.exports = router;
