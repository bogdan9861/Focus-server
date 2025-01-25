/*
  Warnings:

  - Added the required column `commentsCount` to the `Saved` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likesCount` to the `Saved` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentsCount` to the `Liked` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likesCount` to the `Liked` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Saved" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "userPhoto" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "postId" TEXT,
    "photo" TEXT NOT NULL,
    "description" TEXT,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Saved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Saved" ("description", "id", "name", "nickname", "photo", "postId", "userId", "userPhoto") SELECT "description", "id", "name", "nickname", "photo", "postId", "userId", "userPhoto" FROM "Saved";
DROP TABLE "Saved";
ALTER TABLE "new_Saved" RENAME TO "Saved";
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT,
    "name" TEXT,
    "nickname" TEXT,
    "text" TEXT NOT NULL,
    "savedId" TEXT,
    "likedId" TEXT,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_savedId_fkey" FOREIGN KEY ("savedId") REFERENCES "Saved" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_likedId_fkey" FOREIGN KEY ("likedId") REFERENCES "Liked" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("id", "likedId", "name", "nickname", "postId", "text") SELECT "id", "likedId", "name", "nickname", "postId", "text" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_Liked" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "userPhoto" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "postId" TEXT,
    "photo" TEXT NOT NULL,
    "description" TEXT,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Liked" ("description", "id", "name", "nickname", "photo", "postId", "userId", "userPhoto") SELECT "description", "id", "name", "nickname", "photo", "postId", "userId", "userPhoto" FROM "Liked";
DROP TABLE "Liked";
ALTER TABLE "new_Liked" RENAME TO "Liked";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
