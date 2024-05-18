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
  isLiked,
  comment,
  getComments,
  save,
  unsave,
} = require("../controllers/posts");

router.post("/post", auth, post);
router.post("/comment", auth, comment);
router.post("/save", auth, save);
router.post("/unsave", auth, unsave);
router.post("/getComments", auth, getComments);
router.post("/getPostByID", auth, getPostByID);

router.put("/like", auth, like);
router.put("/unlike", auth, unlike);
router.delete("/remove/:id", auth, remove);

router.get("/getUsersPost/:id", auth, getUsersPost);
router.get("/getAllPosts", getAllPosts);
router.post("/isLiked", auth, isLiked);

module.exports = router;
