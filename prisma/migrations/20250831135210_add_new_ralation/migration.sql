-- AddForeignKey
ALTER TABLE `ReplyMessage` ADD CONSTRAINT `ReplyMessage_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
