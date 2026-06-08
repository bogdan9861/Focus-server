/*
  Warnings:

  - You are about to alter the column `type` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Message` MODIFY `type` ENUM('text', 'audio', 'file', 'reply') NOT NULL DEFAULT 'text';
