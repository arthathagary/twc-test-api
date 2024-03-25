const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const contacts = require("./routes/contact");
const users = require("./routes/user");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", users);
app.use("/api/v1", contacts);

module.exports = app;
