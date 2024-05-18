const express = require("express");
const router = express.Router();
const {
  login,
  register,
  current,
  update,
  get,
  follow,
  isFollowed,
  getFollowers,
  getFollows,
  unsub,
  likes,
  saves,
} = require("../controllers/users");
const { auth } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/follow", auth, follow);

router.put("/update", auth, update);

router.delete("/unsub", auth, unsub);

router.get("/get/:id", auth, get);
router.get("/current", auth, current);
router.get("/followers/:id", auth, getFollowers);
router.get("/follows/:id", auth, getFollows);
router.get("/likes/:id", auth, likes);
router.get("/saves/:id", auth, saves);
router.get("/isFollowed/:id", auth, isFollowed);

module.exports = router;
