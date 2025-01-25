-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto") SELECT "commentsCount", "description", "id", "likesCount", "name", "nickname", "photo", "userId", "userPhoto" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
