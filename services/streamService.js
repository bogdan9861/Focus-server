// services/streamService.js
const StreamChat = require("stream-chat").StreamChat;

class StreamService {
  constructor() {
    this.client = StreamChat.getInstance(
      process.env.STREAM_API_KEY,
      process.env.STREAM_API_SECRET
    );
  }

  // Создание токена для пользователя
  async createUserToken(userId) {
    try {
      return this.client.createToken(userId);
    } catch (error) {
      console.error("Error creating Stream token:", error);
      throw error;
    }
  }

  // Создание или получение пользователя
  async upsertUser(userData) {
    try {
      await this.client.upsertUser({
        id: userData.id,
        name: userData.name,
        image: userData.avatar,
        role: "user",
      });

      return await this.createUserToken(userData.id);
    } catch (error) {
      console.error("Error upserting user:", error);
      throw error;
    }
  }

  // Создание канала для звонка
  async createCallChannel(callerId, calleeId, callId) {
    try {
      const channel = this.client.channel("messaging", `call_${callId}`, {
        name: `Call ${callId}`,
        created_by_id: callerId,
        members: [callerId, calleeId],
        call_info: {
          call_id: callId,
          caller_id: callerId,
          callee_id: calleeId,
          status: "ringing",
          created_at: new Date().toISOString(),
        },
      });

      await channel.create();
      return channel;
    } catch (error) {
      console.error("Error creating call channel:", error);
      throw error;
    }
  }

  // Отправка события звонка
  async sendCallEvent(channelId, eventType, eventData) {
    try {
      const channel = this.client.channel("messaging", channelId);
      await channel.sendEvent({
        type: eventType,
        ...eventData,
      });
    } catch (error) {
      console.error("Error sending call event:", error);
      throw error;
    }
  }

  // Получение информации о канале
  async getChannel(channelId) {
    try {
      return this.client.channel("messaging", channelId);
    } catch (error) {
      console.error("Error getting channel:", error);
      throw error;
    }
  }
}

module.exports = new StreamService();
