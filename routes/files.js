const express = require("express");
const router = express.Router();

const fileMiddleware = require("../middleware/file");

router.post("/upload", fileMiddleware.single("image"), (req, res) => {
  try {
    return req.file;
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
