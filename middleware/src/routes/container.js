// Create express router
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const info = require("../utils/insertinfo");

const storage = multer.diskStorage({
    destination: "./dockerdata/container",
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

// Insert container inspected info
router.post("/info/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await info.insertContainer(id, data);
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
        const out = await info.insertDiff(id, data);
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
