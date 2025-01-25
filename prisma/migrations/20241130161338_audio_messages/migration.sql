-- CreateTable
CREATE TABLE "AudioMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatId" TEXT,
    "uri" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AudioMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
