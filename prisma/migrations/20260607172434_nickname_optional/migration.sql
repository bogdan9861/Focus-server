-- DropIndex
DROP INDEX `User_nickname_key` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `nickname` VARCHAR(191) NULL;
