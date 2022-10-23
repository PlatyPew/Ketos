// Create express router
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const insert = require("../utils/insertinfo");
const get = require("../utils/getinfo");

const storage = multer.diskStorage({
    destination: "./dockerdata/container",
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

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

// Allow container download
router.get("/fs/:id", async (req, res) => {
    const id = req.params.id;
    const path = `./dockerdata/container/${id}.tar.gz`;

    if (fs.existsSync(path)) res.download(path);
    else res.status(500).json({ response: "File not found" });
});

/**
 * Insertion of data from acquisition
 */

// Insert container inspected info
router.post("/info/:id", async (req, res) => {
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
router.post("/diff/:id", async (req, res) => {
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
router.post("/fs", upload.single("file"), (req, res) => {
    const file = req.file;

    res.setHeader("Content-Type", "application/json");
    res.json({ response: file });
});

// Allow container logs upload
router.post("/logs", upload.single("file"), (req, res) => {
    const file = req.file;

    res.setHeader("Content-Type", "application/json");
    res.json({ response: file });
});

module.exports = router;
