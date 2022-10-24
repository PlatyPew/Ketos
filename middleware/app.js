// Import express
const express = require("express");
const app = express();

// Imports for express
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Declare port
const PORT = 3000;

// URI for Mongodb
const MONGO = "mongodb://database/ketos";

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "16mb" }));

const acquire = require("./src/routes/acquire");
app.use("/api/acquire", acquire);

const staticc = require("./src/routes/static");
app.use("/api/static", staticc);

const image = require("./src/routes/image");
app.use("/api/image", image);

const container = require("./src/routes/container");
app.use("/api/container", container);

const network = require("./src/routes/network");
app.use("/api/network", network);

const volume = require("./src/routes/volume");
app.use("/api/volume", volume);

// Start Server
console.log(`Waiting to connect to ${MONGO}`);
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
