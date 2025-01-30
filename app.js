const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

// const nodemailer = require("nodemailer");
// const directTransport = require("nodemailer-direct-transport");
// const fromHost = `mail.my`;
// const from = "Focus" + "@" + fromHost; //придумываете свою почту(может быть несуществующая)
// const to = 'besedin_b@bk.ru';
// const transport = nodemailer.createTransport(
//   directTransport({
//     name: fromHost,
//   })
// );
// transport.sendMail(
//   {
//     from,
//     to,
//     subject: "Ваш код подтверждения",
//     html: `
//          <p>31233</p>
//         `,
//   },
//   (err, data) => {
//     console.log(data);

//     if (err) {
//       console.error("Ошибка при отправке:", err);
//     } else {
//       console.log("Письмо отправлено");
//     }
//   }
// );

app.use(cors({ origin: "*" }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/audio", express.static(path.join(__dirname, "audio")));
app.use("/videos", express.static(path.join(__dirname, "videos")));
app.use("/files", express.static(path.join(__dirname, "files")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/files", require("./routes/files"));

app.use("/api/chats", require("./routes/chats"));

module.exports = app;
