/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `recipientName` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `recipientPhoto` on the `Chat` table. All the data in the column will be lost.
  - Made the column `userID_1` on table `Chat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userID_2` on table `Chat` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Message";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID_1" TEXT NOT NULL,
    "userID_2" TEXT NOT NULL
);
INSERT INTO "new_Chat" ("id", "userID_1", "userID_2") SELECT "id", "userID_1", "userID_2" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
