-- AlterTable
ALTER TABLE `Message` MODIFY `type` ENUM('text', 'audio', 'image', 'video', 'file') NOT NULL DEFAULT 'text';
