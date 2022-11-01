const express = require("express");
const router = express.Router();
const axios = require("axios");

const { PROCESS } = require("../utils/ip");

router.get("/process/:id", async (req, res) => {
    const id = req.params.id;

    const [ps, stat] = await Promise.all([
        axios.get(`http://${PROCESS}/ps`, { params: { id: id } }),
        axios.get(`http://${PROCESS}/stat`, { params: { id: id } }),
    ]);

    let info = stat.data.response;
    info["processes"] = ps.data.response;

    res.json({ response: info });
});

module.exports = router;
