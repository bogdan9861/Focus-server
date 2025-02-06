/*
  Warnings:

  - You are about to drop the column `userID_1` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `userID_2` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `user_1_name` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `user_1_photo` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `user_2_name` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `user_2_photo` on the `Chat` table. All the data in the column will be lost.

*/
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
