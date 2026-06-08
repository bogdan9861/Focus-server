/*
  Warnings:

  - Added the required column `time` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Message` ADD COLUMN `time` VARCHAR(191) NOT NULL;
