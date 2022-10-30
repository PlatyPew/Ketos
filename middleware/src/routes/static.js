// Create express router
const express = require("express");
const router = express.Router();
const axios = require("axios");

const insert = require("../utils/insertanal");
const get = require("../utils/getanal");

const METADATA = "metadata:5000";
const VIRUSTOTAL = "virustotal:5000";

router.get("/vuln/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getVulnBrief(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

router.get("/vuln/:id/all", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getVulnAll(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

router.put("/vuln/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await insert.insertVuln(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get metadata of file
router.get("/metadata/:id", async (req, res) => {
    const id = req.params.id;
    const file = req.query.file;

    const metadata = await get.getMetadata(id, file);

    try {
        if (metadata === null) {
            const macrobber = await axios.get(`http://${METADATA}/macrobber`, {
                params: { id: id },
            });
            const data = macrobber.data.response;
            await insert.insertMetadata(id, data);

            res.json({ response: data[file] });
        } else if (Object.keys(metadata.metadata).length === 0) {
            res.status(400).json({ response: "File not found" });
        } else {
            res.json({ response: metadata.metadata[file] });
        }
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get data of file
router.get("/filedata/:id", async (req, res) => {
    const id = req.params.id;
    const file = req.query.file;

    res.setHeader("Content-Type", "application/json");

    try {
        const filedata = await get.getFiledata(id, file);

        if (Object.keys(filedata.filesystem).length === 0) {
            res.status(400).json({ response: "File does not exist" });
            return;
        }

        if (
            filedata.filesystem[file].hashsum === "" &&
            filedata.filesystem[file].type === "" &&
            filedata.filesystem[file].strings === ""
        ) {
            const hash = await axios.get(`http://${METADATA}/hash`, {
                params: { id: id, file: file },
            });

            const type = await axios.get(`http://${METADATA}/type`, {
                params: { id: id, file: file },
            });

            const strings = await axios.get(`http://${METADATA}/strings`, {
                params: { id: id, file: file },
            });

            insert.insertFiledata(id, file, {
                hashsum: hash.data.response,
                type: type.data.response,
                strings: strings.data.response,
            });

            res.json({
                response: {
                    hashsum: hash.data.response,
                    type: type.data.response,
                    strings: strings.data.response,
                },
            });
        } else {
            res.json({
                respose: {
                    hashsum: filedata.filesystem[file].hashsum,
                    type: filedata.filesystem[file].type,
                    strings: filedata.filesystem[file].strings,
                },
            });
        }
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

const _pullWithFile = async (id, file) => {};

const _checkDetectDB = async (id, file) => {
    let detect = await get.getDetect(id, file);

    if (detect === undefined) res.status(400).json({ response: "File does not exist" });

    if (detect === null) {
        let hash = (await get.getFiledata(id, file)).filesystem[file].hashsum;

        if (hash === "") {
            hash = await axios.get(`http://${METADATA}/hash`, {
                params: { id: id, file: file },
            });

            hash = hash.data.response;
        }

        let data = await axios.get(`http://${VIRUSTOTAL}/hashscan`, {
            params: { id: id, hashsum: hash },
        });

        await insert.insertDetect(id, file, data.data.response);

        return data.data.response;
    }

    return detect;
};

router.get("/detect/:id/all", async (req, res) => {
    const id = req.params.id;
    const file = req.query.file;

    const data = await _checkDetectDB(id, file);

    res.setHeader("Content-Type", "application/json");
    res.json({ response: data });
});

module.exports = router;
