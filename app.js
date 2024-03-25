const express = require("express");
const app = express();

const contacts = require("./routes/contact");

app.use(express.json());
app.use("/api/v1", contacts);

module.exports = app;
