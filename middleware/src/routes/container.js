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
