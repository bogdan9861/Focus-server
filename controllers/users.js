const { prisma } = require("../prisma/prisma.client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, nickname, about, password, phone } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const isExist = await prisma.user.findFirst({
      where: {
        phone,
      },
    });

    if (isExist) {
      return res.status(400).json({
        message: "Пользовател с таким номером телефона уже зарегистрирован ",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
        photo: "",
        status: "",
        about: about ? about : "",
        nickname: nickname ? nickname : "",
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Не удалось зарегистрировать пользовятеля" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      ...user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    console.log(req.body);

    if (!phone || !password) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Не удалось найти пользователя" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    if (user && isPasswordCorrect) {
      res.status(200).json({ ...user, token });
    } else {
      res
        .status(400)
        .json({ message: "Номер телефона или пароль не совпадают" });
    }
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const current = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "Не удалось найти пользователя" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const update = async (req, res) => {
  try {
    const { data } = req.body;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Нет данных для обновления" });
    }

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        ...req.user,
        ...data,
        id: req.user.id,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Не удалось получить пользователя" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const { path } = req.file;

    if (!path) {
      res.status(400).json({ message: "Не удалось получить изображение" });
    }

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        ...req.user,
        photo: path,
      },
    });

    await prisma.post.updateMany({
      where: {
        userId: req.user.id,
      },
      data: {
        userPhoto: path,
      },
    });

    if (path !== req.user.photo) {
      await prisma.post.create({
        data: {
          photo: path,
          status: "Новое фото профиля",
          likesCount: "0",
          commentsCount: "0",
          name: req.user.name,
          nickname: req.user.nickName || "",
          userId: req.user.id,
          userPhoto: path,
        },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const follow = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    const alreadyFollow = await prisma.follower.findFirst({
      where: {
        followerId: req.user.id,
        userId: id,
      },
    });

    if (alreadyFollow) {
      return res
        .status(400)
        .json({ message: "Вы уже подписаны на этого польвователя" });
    }

    const newFolowed = await prisma.followed.create({
      data: {
        followedId: id,
        userId: req.user.id,
      },
    });

    const newFolower = await prisma.follower.create({
      data: {
        followerId: req.user.id,
        userId: id,
      },
    });

    if (!newFolowed || !newFolower) {
      return res.status(500).json({ message: "Не удалось подписаться" });
    }

    const followers = await prisma.follower.findMany({
      where: {
        userId: id,
      },
    });

    res.status(201).json(followers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const unsub = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Не удалось получить запись" });
    }

    const followed = await prisma.followed.deleteMany({
      where: {
        followedId: id,
        userId: req.user.id,
      },
    });

    const followes = await prisma.follower.deleteMany({
      where: {
        followerId: req.user.id,
        userId: id,
      },
    });

    if (!followed || !followes) {
      return res.status(500).json({ message: "Не удалось отписаться" });
    }

    const followers = await prisma.follower.findMany({
      where: {
        userId: id,
      },
    });

    res.status(201).json(followers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;

    const followers = await prisma.follower.findMany({
      where: {
        userId: id,
      },
    });

    const ids = [];

    followers.forEach((el) => {
      ids.push(el.followerId);
    });

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (!followers) {
      return res
        .status(404)
        .json({ message: "Не удалось получить список подписчиков" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getFollows = async (req, res) => {
  try {
    const { id } = req.params;

    const follows = await prisma.followed.findMany({
      where: {
        userId: id,
      },
    });

    const ids = [];

    follows.forEach((el) => {
      ids.push(el.followedId);
    });

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (!follows) {
      return res
        .status(404)
        .json({ message: "Не удалось получить список подписок" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const isFollowed = async (req, res) => {
  try {
    const { id } = req.params;

    const followed = await prisma.follower.findFirst({
      where: {
        followerId: req.user.id,
        userId: id,
      },
    });

    res.status(200).json({ followed: !!followed });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  register,
  login,
  current,
  update,
  uploadAvatar,
  get,
  follow,
  isFollowed,
  getFollowers,
  getFollows,
  unsub,
};
