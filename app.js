const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/files", require("./routes/files"));

app.use("/api/chats", require("./routes/chats"));

module.exports = app;
