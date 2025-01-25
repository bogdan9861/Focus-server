/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Followed` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Follower" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Follower" ("id", "userId") SELECT "id", "userId" FROM "Follower";
DROP TABLE "Follower";
ALTER TABLE "new_Follower" RENAME TO "Follower";
CREATE TABLE "new_Followed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    CONSTRAINT "Followed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Followed" ("id", "userId") SELECT "id", "userId" FROM "Followed";
DROP TABLE "Followed";
ALTER TABLE "new_Followed" RENAME TO "Followed";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
