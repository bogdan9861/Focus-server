-- AlterTable
ALTER TABLE `Message` ADD COLUMN `editedTime` DATETIME(3) NULL,
    ADD COLUMN `isEdited` BOOLEAN NOT NULL DEFAULT false;
