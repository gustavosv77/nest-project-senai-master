-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "token" INTEGER NOT NULL DEFAULT 1,
    "admin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_user" ("admin", "email", "id", "name", "password", "picture", "token") SELECT "admin", "email", "id", "name", "password", "picture", "token" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
