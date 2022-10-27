// Create express router
const express = require("express");
const router = express.Router();
const axios = require("axios");

const get = require("../utils/getanal");
const insert = require("../utils/insertanal");

const SNYK = "snyk:5000";
const METADATA = "metadata:5000";

// Start snyk analysis
router.get("/vuln/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");

    const out = await axios.get(`http://${SNYK}/vulnscan`, { params: { id: id } });
    res.json(out.data);
});

// Get data of file
router.get("/filedata/:id", async (req, res) => {
    const id = req.params.id;
    const file = req.query.file;

    res.setHeader("Content-Type", "application/json");

    try {
        const filedata = await get.getFiledata(id, file);

        if (Object.keys(filedata.filesystem).length === 0) {
            res.status(500).json({ responose: "File does not exist" });
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
                hashsum: hash.data,
                type: type.data,
                strings: strings.data,
            });

            res.json({ response: { hashsum: hash.data, type: type.data, strings: strings.data } });
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

module.exports = router;
