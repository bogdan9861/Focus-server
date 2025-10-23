-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ReplyMessage` DROP FOREIGN KEY `ReplyMessage_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `ReplyMessage` DROP FOREIGN KEY `ReplyMessage_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `ReplyMessage` DROP FOREIGN KEY `ReplyMessage_userId_fkey`;

-- DropIndex
DROP INDEX `Message_chatId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `Message_userId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `ReplyMessage_chatId_fkey` ON `ReplyMessage`;

-- DropIndex
DROP INDEX `ReplyMessage_messageId_fkey` ON `ReplyMessage`;

-- DropIndex
DROP INDEX `ReplyMessage_userId_fkey` ON `ReplyMessage`;

-- AlterTable
ALTER TABLE `Message` MODIFY `userId` VARCHAR(191) NULL,
    MODIFY `chatId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ReplyMessage` MODIFY `userId` VARCHAR(191) NULL,
    MODIFY `chatId` VARCHAR(191) NULL,
    MODIFY `messageId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReplyMessage` ADD CONSTRAINT `ReplyMessage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReplyMessage` ADD CONSTRAINT `ReplyMessage_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReplyMessage` ADD CONSTRAINT `ReplyMessage_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
