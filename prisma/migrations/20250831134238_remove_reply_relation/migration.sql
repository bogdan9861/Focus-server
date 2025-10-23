-- DropForeignKey
ALTER TABLE `ReplyMessage` DROP FOREIGN KEY `ReplyMessage_messageId_fkey`;

-- DropIndex
DROP INDEX `ReplyMessage_messageId_fkey` ON `ReplyMessage`;
