-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Followed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "photo" TEXT NOT NULL,
    "nickname" TEXT,
    "name" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Followed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Followed" ("id", "nickname", "photo", "userId") SELECT "id", "nickname", "photo", "userId" FROM "Followed";
DROP TABLE "Followed";
ALTER TABLE "new_Followed" RENAME TO "Followed";
CREATE TABLE "new_Follower" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "photo" TEXT NOT NULL,
    "nickname" TEXT,
    "name" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Follower" ("id", "nickname", "photo", "userId") SELECT "id", "nickname", "photo", "userId" FROM "Follower";
DROP TABLE "Follower";
ALTER TABLE "new_Follower" RENAME TO "Follower";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
