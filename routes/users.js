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
} = require("../controllers/users");
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

router.get("/get/:id", auth, get);
router.get("/current", auth, current);
router.get("/followers/:id", auth, getFollowers);
router.get("/follows/:id", auth, getFollows);

module.exports = router;
