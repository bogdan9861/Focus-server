/*
  Warnings:

  - You are about to drop the column `name` on the `Followed` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Followed` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Followed` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `commentsCount` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the column `userPhoto` on the `Saved` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Followed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "ownerId" TEXT,
    CONSTRAINT "Followed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Followed" ("id", "userId") SELECT "id", "userId" FROM "Followed";
DROP TABLE "Followed";
ALTER TABLE "new_Followed" RENAME TO "Followed";
CREATE TABLE "new_Follower" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "ownerId" TEXT,
    CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Follower" ("id", "userId") SELECT "id", "userId" FROM "Follower";
DROP TABLE "Follower";
ALTER TABLE "new_Follower" RENAME TO "Follower";
CREATE TABLE "new_Saved" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "postId" TEXT,
    CONSTRAINT "Saved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Saved" ("id", "postId", "userId") SELECT "id", "postId", "userId" FROM "Saved";
DROP TABLE "Saved";
ALTER TABLE "new_Saved" RENAME TO "Saved";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
