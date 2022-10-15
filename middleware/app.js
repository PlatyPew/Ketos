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
/* const MONGO = "mongodb://api_local/ketos"; */
const MONGO = "mongodb://localhost/ketos";

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
