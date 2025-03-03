const { prisma } = require("../prisma/prisma.client");
const fs = require("fs");

const post = async (req, res) => {
  try {
    if (!req.file.path) {
      return res
        .status(400)
        .json({ message: "Не удалось получить изображение" });
    }

    const post = await prisma.post.create({
      data: {
        photo: req.file.path,
        likesCount: "0",
        commentsCount: "0",
        status: "Новая публикация",

        userId: req.user.id,
        userPhoto: req.user.photo,
        nickname: req.user.nickname,
        name: req.user.name,
      },
    });

    if (!post) {
      return res.status(500).json({ message: "Не удалось создать запись" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(404)
        .json({ message: "Не удалось получить id публикации" });
    }

    const post = await prisma.post.delete({
      where: {
        id,
      },
    });

    fs.rm(post.photo, (file) => {
      console.log("removed", file);
    });

    if (!post) {
      return res.status(500).json({ message: "Не удалось удалить запись" });
    }

    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getPostByID = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(404)
        .json({ message: "Не удалось получить id публикации" });
    }

    const posts = await prisma.post.findMany({
      where: {
        id,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getUsersPost = async (req, res) => {
  try {
    const { id } = req.body;

    const posts = await prisma.post.findMany({
      where: {
        userId: id,
      },
    });

    res.status(200).json(posts.reverse());
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const like = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    const likedPost = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...likedPost,
        likesCount: +likedPost.likesCount + 1 + "",
      },
    });

    const createLiked = await prisma.liked.create({
      data: {
        postId: id,
        userId: req.user.id,
      },
    });

    if (!createLiked || !post) {
      return res.status(500).json({ message: "Не удалось лайкнуть пост" });
    }

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const isLiked = async (req, res) => {
  try {
    const { id } = req.body;

    const likes = await prisma.liked.findFirst({
      where: {
        postId: id,
        userId: req.user.id,
      },
    });

    res.status(200).json({ isLiked: !!likes });
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const likes = async (req, res) => {
  try {
    const { id } = req.body;

    const likedPostsIDs = await prisma.liked.findMany({
      where: {
        userId: id,
      },
    });

    const ids = [];

    likedPostsIDs.forEach((el) => {
      ids.push(el.postId);
    });

    const post = await prisma.post.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const unlike = async (req, res) => {
  try {
    const { id } = req.body;

    const likedPost = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    if (!likedPost) {
      return res.status(404).json({ message: "Не удалось найти пост" });
    }

    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...likedPost,
        likesCount: +likedPost.likesCount - 1 + "",
      },
    });

    const deleteLike = await prisma.liked.deleteMany({
      where: {
        postId: id,
        userId: req.user.id,
      },
    });

    if (!post || !deleteLike) {
      return res.status(500).json({ message: "Не удалось отменить лайк" });
    }

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const save = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    const saved = await prisma.saved.create({
      data: {
        postId: id,
        userId: req.user.id,
      },
    });

    res.status(201).json({ message: "Запись успешно сохранена" });
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const saves = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    const userSaves = await prisma.saved.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const ids = [];

    userSaves.forEach((el) => {
      ids.push(el.postId);
    });

    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    res.status(200).json(posts.reverse());
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const isSaved = async (req, res) => {
  try {
    const { id } = req.body;

    const post = await prisma.saved.findFirst({
      where: {
        postId: id,
      },
    });

    res.status(200).json({ isSaved: !!post });
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const unsave = async (req, res) => {
  try {
    const { id } = req.body;

    console.log(id);

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    const saved = await prisma.saved.deleteMany({
      where: {
        postId: id,
        userId: req.user.id,
      },
    });

    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const comment = async (req, res) => {
  try {
    const { message, id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    if (!message) {
      return res
        .status(400)
        .json({ message: "Не удалось получить текст комментария" });
    }

    const comment = await prisma.comment.create({
      data: {
        postId: id,
        nickname: req.body.nickname || "",
        name: req.user.name,
        text: message,
      },
    });

    if (!comment) {
      return res
        .status(500)
        .json({ message: "Не удалось опубликовать комментарий" });
    }

    res.status(201).json(comment);

    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
    });

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...post,
        commentsCount: comments.length + "",
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
    });

    res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getRecomendations = async (req, res) => {
  try {
    const followed = await prisma.followed.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const ids = [];

    followed.forEach((el) => {
      ids.push(el.id);
    });

    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getVideoPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        photo: { endsWith: ".mp4" },
      },
    });

    if (post) {
      return res.status(200).json(posts);
    } else {
      return res.status(404).json({ posts: [] });
    }
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  post,
  remove,
  getUsersPost,
  getAllPosts,
  getPostByID,
  like,
  likes,
  unlike,
  isLiked,
  save,
  saves,
  unsave,
  isSaved,
  comment,
  getComments,
  getRecomendations,
  getVideoPosts,
};
