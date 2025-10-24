const notificationService = require("../services/notificationService");

const saveToken = async (req, res) => {
  try {
    const { userId, token, device } = req.body;

    if (!userId || !token) {
      return res.status(400).json({
        error: "UserId and token are required",
      });
    }

    const result = await notificationService.saveFCMToken(
      userId,
      token,
      device
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error saving token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteToken = async (req, res) => {
  try {
    const { token } = req.params;
    await notificationService.removeFCMToken(token);
    res.json({ success: true });
  } catch (error) {
    console.error("Error removing token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendNotification = async (req, res) => {
  try {
    const { userId, title, body, data } = req.body;

    if (!userId || !title || !body) {
      return res.status(400).json({
        error: "UserId, title and body are required",
      });
    }

    const result = await notificationService.sendToUser(userId, {
      title,
      body,
      data,
    });

    res.json({ success: true, data: result });
    
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  saveToken,
  deleteToken,
  sendNotification,
};
