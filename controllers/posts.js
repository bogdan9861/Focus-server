const { prisma } = require("../prisma/prisma.client");

const post = async (req, res) => {
  try {
    const { photo, description } = req.body;

    if (!photo) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const post = await prisma.post.create({
      data: {
        photo,
        likesCount: "0",
        commentsCount: "0",
        description: description || "",
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

    if (!post) {
      return res.status(500).json({ message: "Не удалось удалить запись" });
    }

    res.status(200).json({ message: "Запись успешно удалена" });
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
    const { id } = req.params;

    const posts = await prisma.post.findMany({
      where: {
        userId: id,
      },
    });

    res.status(200).json(posts);
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

const unsave = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    const saved = await prisma.saved.delete({
      where: {
        postId: id,
        userId: req.user.id,
      },
    });

    res.status(201).json({ message: "Запись удалена из сохранений" });
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  post,
  remove,
  getUsersPost,
  getAllPosts,
  getPostByID,
  like,
  unlike,
  isLiked,
  comment,
  getComments,
  save,
  unsave,
};
