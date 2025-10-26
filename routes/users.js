const express = require("express");
const router = express.Router();
const {
  login,
  register,
  current,
  update,
  uploadAvatar,
  get,
  follow,
  isFollowed,
  getFollowers,
  getFollows,
  unsub,
  getAll,
} = require("../controllers/users");

const {
  saveToken,
  deleteToken,
  sendNotification,
  getUsersTokens,
  removeFCMToken,
} = require("../controllers/users.fcm");

const { auth } = require("../middleware/auth");
const fileMiddleware = require("../middleware/file");

router.post("/login", login);
router.post("/register", register);
router.post("/follow", auth, follow);
router.post("/isFollowed", auth, isFollowed);

router.put("/update", auth, update);
router.put(
  "/uploadAvatar",
  auth,
  fileMiddleware.single("avatar"),
  uploadAvatar
);

router.delete("/unsub", auth, unsub);

router.get("/get", auth, getAll);
router.get("/get/:id", auth, get);
router.get("/current", auth, current);
router.get("/followers/:id", auth, getFollowers);
router.get("/follows/:id", auth, getFollows);

// FCM

router.post("/token", saveToken);
router.delete("/token", deleteToken);
router.post("/send-notification", sendNotification);
router.post("/get-user-token", getUsersTokens);
router.delete("/remove-token", auth, removeFCMToken);

module.exports = router;
