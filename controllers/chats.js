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

const update = async (req, res) => {
  try {
    const { chatId, name } = req.body;

    if (!name || !chatId) {
      res.status(400).json({ message: "Все поля обязательны" });
    }

    const chat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        photo: req.file.path || prisma.chat.fields.photo,
        name: name || prisma.chat.fields.name,
      },
    });

    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(400).json({ message: "Не удалось получить чат" });
    }
  } catch (error) {
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

const getChatByRecipientId = async (req, res) => {
  try {
    // const { id } = req.params;

    // const chat = await prisma.c.findFirst({
    //   where: {
       
    //   },
    // });

    // if (chat) {
    //   const history = getMessagesHistory(`./messages/${chat.id}.txt`);

    //   if (history) {
    //     res.status(200).json(history);
    //   } else {
    //     res.status(200).json([]);
    //   }
    // } else {
    //   res.status(500).json({ message: "Не удалось получить историю чата" });
    // }
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

      console.log(file.type);

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
  getChatByRecipientId,
  sendVoice,
  sendFile,
  update,
};
