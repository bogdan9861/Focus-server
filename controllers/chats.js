const fs = require("fs");
const { prisma } = require("../prisma/prisma.client");
const getMessagesHistory = require("../utils/getMessagesHistory");
const getCurrentTime = require("../utils/getCurrentTime");

const create = async (req, res) => {
  try {
    const { userIds, name } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const allUserIds = [...new Set([...userIds, req.user.id])];

    console.log("allUserIds", allUserIds);

    const candidateChats = await prisma.chat.findMany({
      where: {
        users: {
          every: {
            userId: { in: allUserIds },
          },
        },
      },
      include: {
        users: {
          include: { user: true },
        },
      },
    });

    const existingChat = candidateChats.find(
      (chat) => chat.users.length === allUserIds.length
    );

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = await prisma.chat.create({
      data: {
        name: name || "",
        photo: req?.file?.path || "",
        users: {
          create: allUserIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
      include: {
        users: {
          include: { user: true },
        },
      },
    });

    return res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Что-то пошло не так" });
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

    if (!chatId || (!text && !req?.file?.path)) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const chat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessage: text || req?.file?.name,
      },
    });

    const time = getCurrentTime();

    const message = await prisma.message.create({
      data: {
        type: "text",
        text: text,
        fileUrl: req?.file?.path || "",
        chatId,
        userId: req.user.id,
        time,
      },
      include: {
        sender: true,
      },
    });

    res.status(201).json({ message });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const reply = async (req, res) => {
  try {
    const { chatId, text, replyMessageId } = req.body;

    if (!chatId || (!text && !req?.file?.path)) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const time = getCurrentTime();

    const message = await prisma.message.create({
      data: {
        text: text || "",
        fileUrl: req?.file?.path || "",
        type: "reply",
        chatId: chatId,
        userId: req.user.id,
        time,
        replyMessageId,
      },
      include: {
        sender: true,
        replyMessage: true,
      },
    });

    if (message) {
      res.status(201).json({ message });
    } else {
      res.status(500).json({ message: "не удалось создать сообщение" });
    }
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const removeMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const isMessageOwner = await prisma.message.findFirst({
      where: {
        id,
      },
    });

    if (isMessageOwner.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Нет прав на изменение этого сообщения" });
    }

    const message = await prisma.message.delete({
      where: {
        id,
      },
    });

    if (!message) {
      return res.status(404).json({ message: "Не удалось найти сообщение" });
    }

    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const editMessage = async (req, res) => {
  try {
    const { id, text, file } = req.body;

    if (!id || (!text && !req?.file?.path)) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    let data = {};

    if (text) data.text = text;
    if (req.file.path) data.fileUrl = req.file.path;

    const time = getCurrentTime();

    const isMessageOwner = await prisma.message.findFirst({
      where: {
        id,
      },
    });

    if (isMessageOwner.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Нет прав на изменение этого сообщения" });
    }

    const message = await prisma.message.update({
      where: {
        id,
      },
      data: {
        ...data,
        editedTime: time,
        isEdited: true,
      },
    });

    res.status(200).json(message);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const getMessagesByChatId = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const messages = await prisma.message.findMany({
      where: {
        chatId: id,
      },
      include: {
        replyMessage: {
          include: {
            sender: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    res.status(200).json(messages);
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

    if (!req.file.path) {
      return res.status(404).json({ message: "Не удалось получить файл" });
    }

    const audio = await prisma.message.create({
      data: {
        type: "audio",
        chatId,
        userId: req.user.id,
        time,
        fileUrl: req.file.path,
      },
      include: {
        sender: true,
      },
    });

    res.status(201).json(audio);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const sendFile = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const time = getCurrentTime();

    if (!req.file.path) {
      return res.status(404).json({ message: "Не удалось получить файл" });
    }

    const audio = await prisma.message.create({
      data: {
        type: "file",
        chatId,
        userId: req.user.id,
        time,
        fileUrl: req.file.path,
      },
      include: {
        sender: true,
      },
    });

    res.status(201).json(audio);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  create,
  send,
  reply,
  removeMessage,
  editMessage,
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
