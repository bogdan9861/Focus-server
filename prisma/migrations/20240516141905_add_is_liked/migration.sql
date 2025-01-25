-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Saved" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "userPhoto" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "photo" TEXT NOT NULL,
    "description" TEXT,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Saved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Saved" ("commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto") SELECT "commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto" FROM "Saved";
DROP TABLE "Saved";
ALTER TABLE "new_Saved" RENAME TO "Saved";
CREATE TABLE "new_Liked" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "userPhoto" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "isLiked" BOOLEAN NOT NULL DEFAULT true,
    "photo" TEXT NOT NULL,
    "description" TEXT,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Liked" ("commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto") SELECT "commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto" FROM "Liked";
DROP TABLE "Liked";
ALTER TABLE "new_Liked" RENAME TO "Liked";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
