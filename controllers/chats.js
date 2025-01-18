const fs = require("fs");
const { prisma } = require("../prisma/prisma.client");
const getMessagesHistory = require("../utils/getMessagesHistory");
const getCurrentTime = require("../utils/getCurrentTime");

const create = async (req, res) => {
  try {
    const { recipientId } = req.body;

    if (!recipientId)
      return res
        .status(400)
        .json({ message: "Не уадлось получить id получателя" });

    const recipient = await prisma.user.findFirst({
      where: {
        id: recipientId,
      },
    });

    const isExist = await prisma.chat.findFirst({
      where: {
        AND: [
          { userID_1: req.user.id || recipientId },
          { userID_2: recipientId || req.user.id },
        ],
      },
    });

    if (!isExist) {
      const chat = await prisma.chat.create({
        data: {
          userID_1: req.user.id,
          userID_2: recipientId,

          user_1_name: req.user.name,
          user_1_photo: req.user.photo,

          user_2_name: recipient.name,
          user_2_photo: recipient.photo,
        },
      });

      if (chat) {
        res.status(201).json(chat);
      } else {
        res.status(400).json({ message: "Не удалось создать чат" });
      }
    } else {
      return res.status(200).json(isExist);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const send = async (req, res) => {
  try {
    const { chatId, text } = req.body;

    const time = getCurrentTime();

    if (!text || !chatId) {
      res.status(400).json({ message: "Все поля обязательны" });
    }

    const safetyString = text.replace("|id|", "");

    const path = `./messages/${chatId}.txt`;
    const message = `${safetyString}|id|${req.user.id}|time|${time};`;

    const history = getMessagesHistory(path);

    if (fs.existsSync(path)) {
      fs.appendFileSync(path, message, (err) => {
        console.log(err);
      });
    } else {
      fs.writeFile(path, message, (err) => {
        console.log(err);
      });
    }

    if (history) {
      res.status(200).json(history);
    } else {
      res.status(200).json([{}]);
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
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
        OR: [{ userID_1: req.user.id }, { userID_2: req.user.id }],
      },
    });

    if (chats) {
      res.status(200).json(chats);
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
    const { id } = req.params;

    const chat = await prisma.chat.findFirst({
      where: {
        AND: [{ userID_1: req.user.id || id }, { userID_2: id || req.user.id }],
      },
    });

    if (chat) {
      console.log(chat);

      const history = getMessagesHistory(`./messages/${chat.id}.txt`);

      if (history) {
        res.status(200).json(history);
      } else {
        res.status(200).json([]);
      }
    } else {
      res.status(500).json({ message: "Не удалось получить историю чата" });
    }
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

module.exports = {
  create,
  send,
  getMessagesByChatId,
  get,
  getById,
  removeById,
  getChatByRecipientId,
  sendVoice,
};
