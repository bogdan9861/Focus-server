const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const audio = require("../middleware/audio");
const allFiles = require("../middleware/allFiles");
const {
  create,
  send,
  getMessagesByChatId,
  get,
  getById,
  removeById,
  getChatByRecipientId,
  sendVoice,
  sendFile,
} = require("../controllers/chats");

router.post("/upload/voice", auth, audio.single("audio"), sendVoice);
router.post("/upload/file", auth, allFiles.single("file"), sendFile);

router.post("/create", auth, create);
router.post("/history", auth, getMessagesByChatId);
router.post("/send", auth, send);
router.post("/getById", auth, getById);

router.post("/get", auth, get);

router.post("/recipient/:id", auth, getChatByRecipientId);

router.delete("/remove/:id", auth, removeById);

module.exports = router;
