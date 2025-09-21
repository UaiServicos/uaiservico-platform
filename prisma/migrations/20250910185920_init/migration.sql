/*
  Warnings:

  - You are about to drop the `follows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "follows_followerId_followingId_key";

-- DropIndex
DROP INDEX "post_likes_postId_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "follows";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "notifications";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "post_comments";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "post_likes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "posts";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("avatar", "createdAt", "email", "id", "name", "phone", "updatedAt") SELECT "avatar", "createdAt", "email", "id", "name", "phone", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_whatsapp_integrations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "providerId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "apiKey" TEXT,
    "webhookUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "whatsapp_integrations_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_whatsapp_integrations" ("active", "apiKey", "createdAt", "id", "phoneNumber", "providerId", "updatedAt", "webhookUrl") SELECT "active", "apiKey", "createdAt", "id", "phoneNumber", "providerId", "updatedAt", "webhookUrl" FROM "whatsapp_integrations";
DROP TABLE "whatsapp_integrations";
ALTER TABLE "new_whatsapp_integrations" RENAME TO "whatsapp_integrations";
CREATE UNIQUE INDEX "whatsapp_integrations_providerId_key" ON "whatsapp_integrations"("providerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
