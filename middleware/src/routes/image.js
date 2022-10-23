// Create express router
const express = require("express");
const router = express.Router();
const multer = require("multer");

const insert = require("../utils/insertinfo");

const storage = multer.diskStorage({
    destination: "./dockerdata/image",
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

// Insert image inspected info
router.post("/info/:id", async (req, res) => {
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
router.post("/dockerfile/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    res.setHeader("Content-Type", "application/json");
    try {
        const out = await insert.insertDockerfile(id, data);
        res.json({ response: out[0] });
    } catch (err) {
        res.status(500).json({ response: err });
    }
});

// Insert image layers
router.post("/layer/:id", async (req, res) => {
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
router.post("/fs", upload.single("file"), (req, res) => {
    const file = req.file;

    res.setHeader("Content-Type", "application/json");
    res.json({ response: file });
});

module.exports = router;
