/*
  Warnings:

  - You are about to drop the `AudioMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `Chat` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AudioMessage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "chats_to_users" (
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("chatId", "userId"),
    CONSTRAINT "chats_to_users_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "chats_to_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Chat" ("id") SELECT "id" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
