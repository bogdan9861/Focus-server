-- AlterTable
ALTER TABLE `Message` MODIFY `type` ENUM('text', 'audio', 'file', 'reply') NOT NULL DEFAULT 'text';

-- AlterTable
ALTER TABLE `ReplyMessage` MODIFY `type` ENUM('text', 'audio', 'file', 'reply') NOT NULL DEFAULT 'text';
