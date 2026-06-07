/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `likedId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `savedId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `editedTime` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(3))`.
  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userPhoto` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `likesCount` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `commentsCount` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `postId` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the `chats_to_users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Made the column `postId` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followedId` on table `Followed` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Followed` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followerId` on table `Follower` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Follower` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Liked` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `chatId` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Saved` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `organizationId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `online` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_likedId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_savedId_fkey`;

-- DropForeignKey
ALTER TABLE `Followed` DROP FOREIGN KEY `Followed_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Follower` DROP FOREIGN KEY `Follower_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Liked` DROP FOREIGN KEY `Liked_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Saved` DROP FOREIGN KEY `Saved_userId_fkey`;

-- DropForeignKey
ALTER TABLE `chats_to_users` DROP FOREIGN KEY `chats_to_users_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `chats_to_users` DROP FOREIGN KEY `chats_to_users_userId_fkey`;

-- DropIndex
DROP INDEX `Comment_likedId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Comment_savedId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Message_userId_fkey` ON `Message`;

-- AlterTable
ALTER TABLE `Chat` DROP COLUMN `fileUrl`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isArchived` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `type` ENUM('PRIVATE', 'GROUP', 'CHANNEL') NOT NULL DEFAULT 'PRIVATE',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `likedId`,
    DROP COLUMN `name`,
    DROP COLUMN `nickname`,
    DROP COLUMN `savedId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `postId` VARCHAR(191) NOT NULL,
    MODIFY `text` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Followed` MODIFY `followedId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Follower` MODIFY `followerId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Liked` DROP COLUMN `postId`,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `date`,
    DROP COLUMN `editedTime`,
    DROP COLUMN `time`,
    DROP COLUMN `userId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `senderId` VARCHAR(191) NOT NULL,
    ADD COLUMN `testId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `text` TEXT NOT NULL,
    MODIFY `type` ENUM('TEXT', 'AUDIO', 'FILE', 'IMAGE', 'VIDEO', 'REPLY', 'TEST', 'SYSTEM') NOT NULL DEFAULT 'TEXT',
    MODIFY `fileUrl` VARCHAR(191) NULL,
    MODIFY `chatId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `name`,
    DROP COLUMN `nickname`,
    DROP COLUMN `userPhoto`,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `likesCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `commentsCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Saved` DROP COLUMN `postId`,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `organizationId` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('TEACHER', 'STUDENT', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `about` VARCHAR(191) NULL,
    MODIFY `photo` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NULL,
    MODIFY `online` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `chats_to_users`;

-- CreateTable
CREATE TABLE `Organization` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Channel` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NULL,
    `type` ENUM('SUBJECT', 'INFORMATION') NOT NULL,
    `subjectName` VARCHAR(191) NULL,
    `teacherOnly` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `teacherId` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Channel_chatId_key`(`chatId`),
    INDEX `Channel_organizationId_idx`(`organizationId`),
    INDEX `Channel_teacherId_idx`(`teacherId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChannelMember` (
    `id` VARCHAR(191) NOT NULL,
    `channelId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ChannelMember_userId_idx`(`userId`),
    UNIQUE INDEX `ChannelMember_channelId_userId_key`(`channelId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_members` (
    `chatId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `chat_members_userId_idx`(`userId`),
    PRIMARY KEY (`chatId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Test` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `timeLimit` INTEGER NULL,
    `maxScore` INTEGER NOT NULL DEFAULT 100,
    `showAnswers` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `teacherId` VARCHAR(191) NOT NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `channelId` VARCHAR(191) NULL,

    INDEX `Test_teacherId_idx`(`teacherId`),
    INDEX `Test_organizationId_idx`(`organizationId`),
    INDEX `Test_channelId_idx`(`channelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `question` TEXT NOT NULL,
    `type` ENUM('SINGLE', 'MULTIPLE', 'TEXT') NOT NULL DEFAULT 'SINGLE',
    `order` INTEGER NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 1,
    `testId` VARCHAR(191) NOT NULL,

    INDEX `TestQuestion_testId_idx`(`testId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestAnswer` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `isCorrect` BOOLEAN NOT NULL DEFAULT false,
    `questionId` VARCHAR(191) NOT NULL,

    INDEX `TestAnswer_questionId_idx`(`questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompletedTest` (
    `id` VARCHAR(191) NOT NULL,
    `resultPercent` DOUBLE NOT NULL,
    `correctAnswers` INTEGER NOT NULL DEFAULT 0,
    `totalQuestions` INTEGER NOT NULL DEFAULT 0,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completedAt` DATETIME(3) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `testId` VARCHAR(191) NOT NULL,

    INDEX `CompletedTest_studentId_idx`(`studentId`),
    INDEX `CompletedTest_testId_idx`(`testId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompletedTestAnswer` (
    `id` VARCHAR(191) NOT NULL,
    `completedTestId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `textAnswer` TEXT NULL,
    `isCorrect` BOOLEAN NOT NULL DEFAULT false,

    INDEX `CompletedTestAnswer_completedTestId_idx`(`completedTestId`),
    INDEX `CompletedTestAnswer_questionId_idx`(`questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompletedAnswerSelection` (
    `id` VARCHAR(191) NOT NULL,
    `completedTestAnswerId` VARCHAR(191) NOT NULL,
    `answerId` VARCHAR(191) NOT NULL,

    INDEX `CompletedAnswerSelection_completedTestAnswerId_idx`(`completedTestAnswerId`),
    INDEX `CompletedAnswerSelection_answerId_idx`(`answerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Chat_type_idx` ON `Chat`(`type`);

-- CreateIndex
CREATE INDEX `Message_senderId_idx` ON `Message`(`senderId`);

-- CreateIndex
CREATE INDEX `Message_testId_idx` ON `Message`(`testId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_nickname_key` ON `User`(`nickname`);

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_key` ON `User`(`phone`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Channel` ADD CONSTRAINT `Channel_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Channel` ADD CONSTRAINT `Channel_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Channel` ADD CONSTRAINT `Channel_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChannelMember` ADD CONSTRAINT `ChannelMember_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChannelMember` ADD CONSTRAINT `ChannelMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_members` ADD CONSTRAINT `chat_members_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_members` ADD CONSTRAINT `chat_members_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestQuestion` ADD CONSTRAINT `TestQuestion_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestAnswer` ADD CONSTRAINT `TestAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `TestQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompletedTest` ADD CONSTRAINT `CompletedTest_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompletedTest` ADD CONSTRAINT `CompletedTest_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompletedTestAnswer` ADD CONSTRAINT `CompletedTestAnswer_completedTestId_fkey` FOREIGN KEY (`completedTestId`) REFERENCES `CompletedTest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompletedTestAnswer` ADD CONSTRAINT `CompletedTestAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `TestQuestion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompletedAnswerSelection` ADD CONSTRAINT `CompletedAnswerSelection_completedTestAnswerId_fkey` FOREIGN KEY (`completedTestAnswerId`) REFERENCES `CompletedTestAnswer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompletedAnswerSelection` ADD CONSTRAINT `CompletedAnswerSelection_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `TestAnswer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Followed` ADD CONSTRAINT `Followed_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saved` ADD CONSTRAINT `Saved_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Liked` ADD CONSTRAINT `Liked_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Comment` RENAME INDEX `Comment_postId_fkey` TO `Comment_postId_idx`;

-- RenameIndex
ALTER TABLE `FCMToken` RENAME INDEX `FCMToken_userId_fkey` TO `FCMToken_userId_idx`;

-- RenameIndex
ALTER TABLE `Followed` RENAME INDEX `Followed_userId_fkey` TO `Followed_userId_idx`;

-- RenameIndex
ALTER TABLE `Follower` RENAME INDEX `Follower_userId_fkey` TO `Follower_userId_idx`;

-- RenameIndex
ALTER TABLE `Liked` RENAME INDEX `Liked_userId_fkey` TO `Liked_userId_idx`;

-- RenameIndex
ALTER TABLE `Message` RENAME INDEX `Message_chatId_fkey` TO `Message_chatId_idx`;

-- RenameIndex
ALTER TABLE `Message` RENAME INDEX `Message_replyMessageId_fkey` TO `Message_replyMessageId_idx`;

-- RenameIndex
ALTER TABLE `Post` RENAME INDEX `Post_userId_fkey` TO `Post_userId_idx`;

-- RenameIndex
ALTER TABLE `Saved` RENAME INDEX `Saved_userId_fkey` TO `Saved_userId_idx`;
