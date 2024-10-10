const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  post,
  remove,
  getUsersPost,
  getPostByID,
  getAllPosts,
  like,
  unlike,
  likes,
  isLiked,
  comment,
  getComments,
  save,
  unsave,
  saves,
  isSaved,
  getRecomendations,
} = require("../controllers/posts");
const fileMiddleware = require("../middleware/file");

router.post("/post", auth, fileMiddleware.single("image"), post);
router.post("/comment", auth, comment);
router.post("/getComments", auth, getComments);
router.post("/getPostByID", auth, getPostByID);
router.post("/getUsersPost", auth, getUsersPost);

router.post("/save", auth, save);
router.post("/saves", auth, saves);
router.post("/isSaved", isSaved);
router.put("/like", auth, like);
router.put("/unlike", auth, unlike);
router.post("/likes", auth, likes);
router.post("/isLiked", auth, isLiked);

router.delete("/unsave", auth, unsave);
router.delete("/remove/:id", auth, remove);

router.get("/getAllPosts", getAllPosts);
router.get("/recomendations", auth, getRecomendations);

module.exports = router;
