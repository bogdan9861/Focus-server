const streamService = require("./streamService");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const notificationService = require("./notificationService");

class VoipService {
  // Инициирование звонка
  async initiateCall(caller, calleeId, callType = "audio") {
    try {
      const callId = uuidv4();

      // Создаем канал в Stream IO
      const channel = await streamService.createCallChannel(
        caller.id,
        calleeId,
        callId
      );

      // Отправляем событие начала звонка
      await streamService.sendCallEvent(channel.id, "call.started", {
        call_id: callId,
        caller: caller,
        call_type: callType,
        timestamp: new Date().toISOString(),
      });

      // Отправляем FCM уведомление
      await this.sendCallNotification(caller, calleeId, {
        callId,
        channelId: channel.id,
        callType,
      });

      return {
        callId,
        channelId: channel.id,
        status: "ringing",
      };
    } catch (error) {
      console.error("Error initiating call:", error);
      throw error;
    }
  }

  // Отправка FCM уведомления
  async sendCallNotification(caller, calleeId, callData) {
    try {
      const data = {
        title: `Входящий звонок`,
        body: `${caller.name} звонит вам`,
        data: {
          type: "voip_call",
          callId: callData.callId,
          channelId: callData.channelId,
          callerId: caller.id,
          callerName: caller.name,
          callType: callData.callType,
          timestamp: Date.now().toString(),
        },
        apns: {
          payload: {
            aps: {
              alert: {
                title: "Входящий звонок",
                body: `${caller.name} звонит вам`,
              },
              sound: "default",
              "content-available": 1,
            },
          },
        },
      };

      notificationService.sendToUser(calleeId, data);
    } catch (error) {
      console.error("Error sending FCM notification:", error);
      throw error;
    }
  }
}

module.exports = new VoipService();
