/*
  Warnings:

  - The values [image,video] on the enum `ReplyMessage_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Message` MODIFY `type` ENUM('text', 'audio', 'file') NOT NULL DEFAULT 'text';

-- CreateTable
CREATE TABLE `ReplyMessage` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL DEFAULT '',
    `type` ENUM('text', 'audio', 'file') NOT NULL DEFAULT 'text',
    `fileUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `time` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReplyMessage` ADD CONSTRAINT `ReplyMessage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReplyMessage` ADD CONSTRAINT `ReplyMessage_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReplyMessage` ADD CONSTRAINT `ReplyMessage_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
