/*
  Warnings:

  - You are about to drop the column `isLiked` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `isLiked` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the column `isLiked` on the `Post` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Liked" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "userPhoto" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "photo" TEXT NOT NULL,
    "description" TEXT,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Liked" ("commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto") SELECT "commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto" FROM "Liked";
DROP TABLE "Liked";
ALTER TABLE "new_Liked" RENAME TO "Liked";
CREATE TABLE "new_Saved" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "userPhoto" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "photo" TEXT NOT NULL,
    "description" TEXT,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Saved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Saved" ("commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto") SELECT "commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto" FROM "Saved";
DROP TABLE "Saved";
ALTER TABLE "new_Saved" RENAME TO "Saved";
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "photo" TEXT NOT NULL,
    "userPhoto" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "description" TEXT,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto") SELECT "commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
