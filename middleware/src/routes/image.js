// Create express router
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

const insert = require("../utils/insertinfo");
const get = require("../utils/getinfo");

const storage = multer.diskStorage({
    destination: "./dockerdata/image",
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

const { METADATA } = require("../utils/ip");

/**
 * Get data from frontend
 */

// List all image ids
router.get("/id", async (_, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getImageIDs();
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get all inspected info by ID
router.get("/info/:id/all", async (req, res) => {
    const id = req.params.id;

    try {
        const out = await get.getImageInfoAll(id);
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename=image-${id}.json`);
        res.send(out);
    } catch (err) {
        res.setHeader("Content-Type", "application/json");
        res.status(500).json({ response: err });
    }
});

// Get brief inspected info by ID
router.get("/info/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getImageInfoBrief(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get dockerfile info by ID
router.get("/dockerfile/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const dockerfile = fs.readFileSync(`./dockerdata/image/${id}.dockerfile`, {
            encoding: "utf8",
            flag: "r",
        });

        res.json({ response: dockerfile });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get layer info by ID
router.get("/layer/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getLayer(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Allow image download
router.get("/fs/:id", async (req, res) => {
    const id = req.params.id;
    const path = `./dockerdata/image/${id}.tar.gz`;

    if (fs.existsSync(path)) res.download(path);
    else res.status(500).json({ response: "File not found" });
});

// Allow file download from layer
router.get("/fs/:id/:layerid", async (req, res) => {
    const id = req.params.id;
    const layerid = req.params.layerid;
    const file = req.query.file;

    try {
        const content = await axios.get(`http://${METADATA}/layerfile`, {
            params: { id: id, layerid: layerid, file: file },
        });

        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename=${file}`);
        res.send(content.data);
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

/**
 * Insertion of data from acquisition
 */

// Insert image inspected info
router.put("/info/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await insert.insertImage(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Insert image dockerfile
router.put("/dockerfile", upload.single("file"), (req, res) => {
    const file = req.file;

    res.setHeader("Content-Type", "application/json");
    res.json({ response: file });
});

// Insert image layers
router.put("/layer/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await insert.insertLayer(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Allow image upload
router.put("/fs", upload.single("file"), (req, res) => {
    const file = req.file;

    res.setHeader("Content-Type", "application/json");
    res.json({ response: file });
});

module.exports = router;
