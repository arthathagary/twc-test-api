const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const contacts = require("./routes/contact");
const users = require("./routes/user");
const authenticateToken = require("./lib/authenticateToken");

const allowedOrigins = [
  "http://localhost:3000",
  "https://twc-test-web-three.vercel.app",
];

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());

app.options("/api/v1/login", cors());

app.use("/api/v1", users);
app.use("/api/v1", authenticateToken, contacts);

module.exports = app;
