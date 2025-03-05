const fs = require("fs");
const { prisma } = require("../prisma/prisma.client");
const getMessagesHistory = require("../utils/getMessagesHistory");
const getCurrentTime = require("../utils/getCurrentTime");

const create = async (req, res) => {
  try {
    const { userIds, name } = req.body;

    if (!userIds)
      return res.status(400).json({ message: "Все поля обязательны" });

    const chat = await prisma.chat.create({
      data: {
        users: {
          create: userIds.map((userId) => ({
            user: {
              connect: { id: userId },
            },
          })),
        },
        name: name || "",
        photo: req?.file?.path || "",
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    if (chat) {
      res.status(201).json(chat);
    } else {
      res.status(400).json({ message: "Не удалось создать чат" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const addUserToChat = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Не удалось найти пользователя с таким ID",
      });
    }

    const chatToUser = await prisma.chatToUsers.create({
      data: {
        chatId: chatId,
        userId: userId,
      },
    });

    if (chatToUser) {
      return res.status(201).json({ user });
    } else {
      return res
        .status(500)
        .json({ message: "Не удалось добавить пользователя" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const removeUserFormChat = async (req, res) => {
  try {
    const { userId, chatId } = req.body;

    if (!userId || !chatId) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    console.log(userId, chatId);

    const user = await prisma.chatToUsers.update({
      where: {
        chatId,
      },
      data: {
        user: {
          disconnect: [{ id: userId }],
        },
      },
    });

    if (user) {
      return res.status(204).json(user);
    } else {
      return res
        .status(404)
        .json({ message: "Не удалось удалить пользователя" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const update = async (req, res) => {
  try {
    const { chatId, name } = req.body;

    if (!chatId) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const chat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        photo: req.file.path,
        name: name,
      },
    });

    if (chat) {
      return res.status(200).json(chat);
    } else {
      return res.status(400).json({ message: "Не удалось получить чат" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error });
  }
};

const send = async (req, res) => {
  try {
    const { chatId, text } = req.body;

    const time = getCurrentTime();

    if (!text || !chatId) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const safetyString = text.replace("|id|", "");

    const path = `./messages/${chatId}.txt`;
    const message = `${safetyString}|id|${req.user.id}|time|${time};`;

    const history = getMessagesHistory(path);

    if (fs.existsSync(path)) {
      fs.appendFileSync(path, message, (err) => {
        console.log(err);
      });

      await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          lastMessage: text,
        },
      });
    } else {
      fs.writeFile(path, message, (err) => {
        console.log(err);
      });
    }

    if (history) {
      return res.status(200).json(history);
    } else {
      return res.status(200).json([{}]);
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error });
  }
};

const getMessagesByChatId = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ message: "Все поля обязательны" });
    }

    const history = getMessagesHistory(`./messages/${id}.txt`);

    if (history) {
      res.status(200).json(history);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const get = async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    if (chats) {
      res.status(200).json(chats);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) res.status(400).json({ message: "Все поля обязательные" });

    const chat = await prisma.chat.findFirst({
      where: { id },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const removeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) res.status(400).json({ message: "Все поля обязательные" });

    const chat = await prisma.chat.delete({
      where: {
        id,
      },
    });

    if (chat) {
      res.status(200).json(chat);
    }

    res.status(500).json({ message: "Не удалось удалить чат" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const sendVoice = async (req, res) => {
  try {
    const { chatId } = req.body;

    const time = getCurrentTime();

    if (!chatId) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessage: "Голосовое сообщение",
      },
    });

    const path = `./messages/${chatId}.txt`;
    const message = `|id|${req.user.id}|time|${time}|audio|${req.file.path};`;

    if (fs.existsSync(path)) {
      fs.appendFileSync(path, message, (err) => {
        console.log(err);
      });
    } else {
      fs.writeFile(path, message, (err) => {
        console.log(err);
      });
    }

    const history = getMessagesHistory(path);

    if (history) {
      res.status(200).json(history);
    } else {
      res.status(400).json({ message: "Не удалось получить историю чата" });
    }
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const sendFile = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const { file } = req;

    const time = getCurrentTime();

    if (file) {
      const path = `./messages/${chatId}.txt`;
      const message = `|id|${req.user.id}|time|${time}|file|${file.path};`;

      console.log(file);

      await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          lastMessage: file.originalname,
        },
      });

      if (fs.existsSync(path)) {
        fs.appendFileSync(path, message, (err) => {
          console.log(err);
        });
      } else {
        fs.writeFile(path, message, (err) => {
          console.log(err);
        });
      }

      res.status(200).json(file);
    } else {
      res.status(400).json({ message: "Не удалось получить файл" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  create,
  send,
  getMessagesByChatId,
  get,
  getById,
  removeById,
  sendVoice,
  sendFile,
  update,
  addUserToChat,
  removeUserFormChat,
};
