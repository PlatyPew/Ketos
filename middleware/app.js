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

// Start Server
console.log(`Waiting to connect to ${MONGO}`);
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
