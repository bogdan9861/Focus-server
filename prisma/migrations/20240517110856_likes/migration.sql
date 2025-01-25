/*
  Warnings:

  - You are about to drop the column `commentsCount` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `userPhoto` on the `Liked` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Liked" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "postId" TEXT,
    CONSTRAINT "Liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Liked" ("id", "postId", "userId") SELECT "id", "postId", "userId" FROM "Liked";
DROP TABLE "Liked";
ALTER TABLE "new_Liked" RENAME TO "Liked";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
