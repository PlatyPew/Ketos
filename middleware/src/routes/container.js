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
router.post("/info/insert", async (req, res) => {
    const data = req.body;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await info.insertContainer(data);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Allow container upload
router.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;

    res.setHeader("Content-Type", "application/json");
    res.json({ response: file });
});

module.exports = router;
