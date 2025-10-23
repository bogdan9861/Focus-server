// services/notificationService.js
const { PrismaClient } = require("@prisma/client");
const admin = require("../config/firebase-admin");

const prisma = new PrismaClient();

class NotificationService {
  // Сохранение FCM токена пользователя
  async saveFCMToken(userId, token, device = null) {
    try {
      return await prisma.fCMToken.upsert({
        where: { token },
        update: { userId, device },
        create: { userId, token, device },
      });
    } catch (error) {
      console.error("Error saving FCM token:", error);
      throw error;
    }
  }

  // Удаление FCM токена
  async removeFCMToken(token) {
    try {
      return await prisma.fCMToken.delete({
        where: { token },
      });
    } catch (error) {
      console.error("Error removing FCM token:", error);
      throw error;
    }
  }

  // Отправка уведомления конкретному пользователю
  async sendToUser(userId, notificationData) {
    try {
      // Получаем все токены пользователя
      const userTokens = await prisma.fCMToken.findMany({
        where: { userId },
        select: { token: true },
      });

      if (userTokens.length === 0) {
        console.log("No FCM tokens found for user:", userId);
        return { success: 0, failure: 0 };
      }

      const tokens = userTokens.map((t) => t.token);
      return await this.sendToTokens(tokens, notificationData, userId);
    } catch (error) {
      console.error("Error sending notification to user:", error);
      throw error;
    }
  }

  // Отправка уведомления на конкретные токены
  async sendToTokens(tokens, notificationData, userId = null) {
    try {
      const message = {
        notification: {
          title: notificationData.title,
          body: notificationData.body,
        },
        data: notificationData.data || {},
        tokens: tokens,
      };

      const response = await admin.messaging().sendEachForMulticast(message);

      // Логируем результат отправки
      await this.logNotificationResult(
        tokens,
        response,
        notificationData,
        userId
      );

      // Удаляем невалидные токены
      await this.cleanupInvalidTokens(tokens, response);

      return {
        success: response.successCount,
        failure: response.failureCount,
        responses: response.responses,
      };
    } catch (error) {
      console.error("Error sending multicast notification:", error);
      throw error;
    }
  }

  // Отправка уведомления на тему
  async sendToTopic(topic, notificationData) {
    try {
      const message = {
        notification: {
          title: notificationData.title,
          body: notificationData.body,
        },
        data: notificationData.data || {},
        topic: topic,
      };

      const response = await admin.messaging().send(message);
      return { messageId: response };
    } catch (error) {
      console.error("Error sending topic notification:", error);
      throw error;
    }
  }

  // Логирование результатов отправки
  async logNotificationResult(tokens, response, notificationData, userId) {
    try {
      for (let i = 0; i < response.responses.length; i++) {
        const tokenResponse = response.responses[i];
        const token = tokens[i];

        if (userId) {
          await prisma.notification.create({
            data: {
              title: notificationData.title,
              body: notificationData.body,
              data: notificationData.data || {},
              userId: userId,
              isSent: tokenResponse.success,
              sentAt: tokenResponse.success ? new Date() : null,
            },
          });
        }

        if (!tokenResponse.success) {
          console.error(
            `Failed to send to token ${token}:`,
            tokenResponse.error
          );
        }
      }
    } catch (error) {
      console.error("Error logging notification result:", error);
    }
  }

  // Очистка невалидных токенов
  async cleanupInvalidTokens(tokens, response) {
    try {
      const invalidTokens = [];

      for (let i = 0; i < response.responses.length; i++) {
        const tokenResponse = response.responses[i];
        if (!tokenResponse.success) {
          const error = tokenResponse.error;
          // Удаляем токены с определенными ошибками
          if (
            error.code === "messaging/invalid-registration-token" ||
            error.code === "messaging/registration-token-not-registered"
          ) {
            invalidTokens.push(tokens[i]);
          }
        }
      }

      if (invalidTokens.length > 0) {
        await prisma.fCMToken.deleteMany({
          where: { token: { in: invalidTokens } },
        });
        console.log(`Removed ${invalidTokens.length} invalid tokens`);
      }
    } catch (error) {
      console.error("Error cleaning up invalid tokens:", error);
    }
  }

  // Получение истории уведомлений пользователя
  async getUserNotifications(userId, skip = 0, take = 20) {
    try {
      return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      });
    } catch (error) {
      console.error("Error getting user notifications:", error);
      throw error;
    }
  }

  // Пометить уведомление как прочитанное
  async markAsRead(notificationId) {
    try {
      return await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true },
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  }
}

module.exports = new NotificationService();
