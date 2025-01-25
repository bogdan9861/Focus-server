-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID_1" TEXT,
    "userID_2" TEXT,
    "user_1_name" TEXT,
    "user_1_photo" TEXT,
    "user_2_name" TEXT,
    "user_2_photo" TEXT
);
INSERT INTO "new_Chat" ("id", "userID_1", "userID_2") SELECT "id", "userID_1", "userID_2" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
