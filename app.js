const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

module.exports = app;
