// Create express router
const express = require("express");
const router = express.Router();
const multer = require("multer");

const info = require("../utils/insertinfo");

const storage = multer.diskStorage({
    destination: "./dockerdata/image",
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

// Insert image inspected info
router.post("/info/insert", async (req, res) => {
    const data = req.body;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await info.insertImage(data);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Insert image dockerfile
router.post("/dockerfile/insert", async (req, res) => {
    const data = req.body;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await info.insertDockerfile(data);
        res.json({ response: out });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Allow image upload
router.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;

    res.setHeader("Content-Type", "application/json");
    res.json({ response: file });
});

module.exports = router;
