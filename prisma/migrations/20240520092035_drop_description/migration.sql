/*
  Warnings:

  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "photo" TEXT NOT NULL,
    "userPhoto" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    "status" TEXT,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("commentsCount", "id", "likesCount", "name", "nickname", "photo", "status", "userId", "userPhoto") SELECT "commentsCount", "id", "likesCount", "name", "nickname", "photo", "status", "userId", "userPhoto" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
