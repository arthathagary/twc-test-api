const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const contacts = require("./routes/contact");
const users = require("./routes/user");
const authenticateToken = require("./lib/authenticateToken");

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.options("/api/v1/login", cors());

app.use("/api/v1", users);
app.use("/api/v1", authenticateToken, contacts);

module.exports = app;
