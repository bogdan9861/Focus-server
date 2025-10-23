/*
  Warnings:

  - You are about to drop the `ReplyMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ReplyMessage` DROP FOREIGN KEY `ReplyMessage_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `ReplyMessage` DROP FOREIGN KEY `ReplyMessage_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `ReplyMessage` DROP FOREIGN KEY `ReplyMessage_userId_fkey`;

-- AlterTable
ALTER TABLE `Message` ADD COLUMN `replyMessageId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `ReplyMessage`;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_replyMessageId_fkey` FOREIGN KEY (`replyMessageId`) REFERENCES `Message`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
