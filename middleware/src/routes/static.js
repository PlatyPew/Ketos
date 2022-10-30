// Create express router
const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormData = require("form-data");

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
    const file = req.query.file.replace(/\$/g, "\\u0024").replace(/\./g, "\\u002e");

    const metadata = await get.getMetadata(id, file);

    try {
        if (metadata === null) {
            const macrobber = await axios.get(`http://${METADATA}/macrobber`, {
                params: { id: id },
            });
            const data = macrobber.data.response;
            await insert.insertMetadata(id, data);

            res.json({ response: data[req.query.file] });
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
    const file = req.query.file.replace(/\$/g, "\\u0024").replace(/\./g, "\\u002e");

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
                params: { id: id, file: req.query.file },
            });

            const type = await axios.get(`http://${METADATA}/type`, {
                params: { id: id, file: req.query.file },
            });

            const strings = await axios.get(`http://${METADATA}/strings`, {
                params: { id: id, file: req.query.file },
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
                response: {
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

const _pullWithFile = async (id, file) => {
    const escapedFile = file.replace(/\$/g, "\\u0024").replace(/\./g, "\\u002e");

    const content = await axios.get(`http://${METADATA}/file`, {
        params: { id: id, file: file },
    });

    const form = new FormData();
    form.append("filecontent", content.data, "file");

    const response = await axios.post(`http://${VIRUSTOTAL}/filescan`, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    await insert.insertDetect(id, escapedFile, response.data.response);

    return response.data.response;
};

const _checkDetectDB = async (id, file) => {
    const escapedFile = file.replace(/\$/g, "\\u0024").replace(/\./g, "\\u002e");
    let detect = await get.getDetect(id, escapedFile);

    if (detect === undefined) res.status(400).json({ response: "File does not exist" });

    if (detect === null) {
        let hash = (await get.getFiledata(id, escapedFile)).filesystem[escapedFile].hashsum;

        if (hash === "") {
            hash = await axios.get(`http://${METADATA}/hash`, {
                params: { id: id, file: file },
            });

            hash = hash.data.response;
        }

        let data = await axios.get(`http://${VIRUSTOTAL}/hashscan`, {
            params: { hashsum: hash },
        });

        await insert.insertDetect(id, escapedFile, data.data.response);

        return data.data.response;
    }

    return detect;
};

router.get("/detect/:id", async (req, res) => {
    const id = req.params.id;
    const file = req.query.file;

    let data = await _checkDetectDB(id, file);

    if (data === null) data = await _pullWithFile(id, file);

    const briefData = {
        names: data.names,
        stats: data.last_analysis_stats,
        results: {
            BitDefender: data.last_analysis_results.BitDefender.result,
            CrowdStrike: data.last_analysis_results.CrowdStrike.result,
            FireEye: data.last_analysis_results.FireEye.result,
            Kaspersky: data.last_analysis_results.Kaspersky.result,
            Malwarebytes: data.last_analysis_results.Malwarebytes.result,
            McAfee: data.last_analysis_results.McAfee.result,
            Microsoft: data.last_analysis_results.Microsoft.result,
            Symantec: data.last_analysis_results.Symantec.result,
        },
        type: {
            description: data.type_description,
            extension: data.type_extension,
        },
    };

    res.setHeader("Content-Type", "application/json");
    res.json({ response: briefData });
});

router.get("/detect/:id/all", async (req, res) => {
    const id = req.params.id;
    const file = req.query.file;

    let data = await _checkDetectDB(id, file);

    if (data === null) data = await _pullWithFile(id, file);

    res.setHeader("Content-Type", "application/json");
    res.json({ response: data });
});

module.exports = router;
