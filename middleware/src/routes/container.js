// Create express router
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

const insert = require("../utils/insertinfo");
const get = require("../utils/getinfo");

const storage = multer.diskStorage({
    destination: "./dockerdata/container",
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

const METADATA = "metadata:5000";

/**
 * Get data from frontend
 */

// List all image ids
router.get("/id", async (_, res) => {
    res.setHeader("Content-Type", "application/json");

    try {
        const out = await get.getContainerIDs();
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get container info
router.get("/info/:id/all", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getContainerInfoAll(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get brief inspected info by ID
router.get("/info/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getContainerInfoBrief(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get container logs by ID
router.get("/logs/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const logs = fs.readFileSync(`./dockerdata/container/${id}.log`, {
            encoding: "utf8",
            flag: "r",
        });

        res.json({ response: logs });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get container diff by ID
router.get("/diff/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getDiffInfoBrief(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Allow container download
router.get("/fs/:id", async (req, res) => {
    const id = req.params.id;
    const path = `./dockerdata/container/${id}.tar.gz`;

    if (fs.existsSync(path)) res.download(path);
    else res.status(500).json({ response: "File not found" });
});

// Get container filesystem upload by ID
router.get("/files/:id", async (req, res) => {
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await get.getFiles(id);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Get specific file
router.get("/files/:id/single", async (req, res) => {
    const file = req.query.file;
    const id = req.params.id;

    try {
        const content = await axios.get(`http://${METADATA}/file`, {
            params: { id: id, file: file },
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

// Insert container inspected info
router.put("/info/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await insert.insertContainer(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Insert container diff
router.put("/diff/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await insert.insertDiff(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Allow container upload
router.put("/fs", upload.single("file"), (req, res) => {
    const file = req.file;

    res.setHeader("Content-Type", "application/json");
    res.json({ response: file });
});

// Allow container logs upload
router.put("/logs", upload.single("file"), (req, res) => {
    const file = req.file;

    res.setHeader("Content-Type", "application/json");
    res.json({ response: file });
});

// Allow container filesystem upload
router.put("/files/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await insert.insertFiles(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

module.exports = router;
