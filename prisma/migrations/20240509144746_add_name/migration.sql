-- RedefineTables
PRAGMA foreign_keys=OFF;
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
INSERT INTO "new_Comment" ("id", "likedId", "nickname", "postId", "savedId", "text") SELECT "id", "likedId", "nickname", "postId", "savedId", "text" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
