const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  create,
  send,
  getMessagesByChatId,
  get,
  getById,
} = require("../controllers/chats");

router.post("/create", auth, create);
router.post("/history", auth, getMessagesByChatId);
router.post("/send", auth, send);
router.get("/get", auth, get);
router.post("/getById", auth, getById);

module.exports = router;
