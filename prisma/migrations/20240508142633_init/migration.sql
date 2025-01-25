-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "photo" TEXT NOT NULL,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT,
    "nickname" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "savedId" TEXT,
    "likedId" TEXT,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_savedId_fkey" FOREIGN KEY ("savedId") REFERENCES "Saved" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_likedId_fkey" FOREIGN KEY ("likedId") REFERENCES "Liked" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Follower" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "photo" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Followed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "photo" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    CONSTRAINT "Followed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Saved" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "photo" TEXT NOT NULL,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Saved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Liked" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "photo" TEXT NOT NULL,
    "likesCount" TEXT NOT NULL,
    "commentsCount" TEXT NOT NULL,
    CONSTRAINT "Liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
