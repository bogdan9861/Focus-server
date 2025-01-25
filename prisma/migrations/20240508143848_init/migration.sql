/*
  Warnings:

  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_User" ("about", "id", "name", "nickname", "photo", "status") SELECT "about", "id", "name", "nickname", "photo", "status" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
