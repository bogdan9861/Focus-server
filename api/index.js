const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/audio", express.static(path.join(__dirname, "audio")));
app.use("/videos", express.static(path.join(__dirname, "videos")));
app.use("/files", express.static(path.join(__dirname, "files")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("../routes/users"));
app.use("/api/posts", require("../routes/posts"));
app.use("/api/files", require("../routes/files"));

app.use("/api/chats", require("../routes/chats"));

// 🔥 тестовый эндпоинт
app.get("/", (req, res) => {
  res.json({ text: "Express server is working on Vercel!" });
});

module.exports = app;
