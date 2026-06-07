/*
  Warnings:

  - Added the required column `isPinned` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chat` ADD COLUMN `fileUrl` VARCHAR(191) NULL,
    ADD COLUMN `isPinned` BOOLEAN NOT NULL;
