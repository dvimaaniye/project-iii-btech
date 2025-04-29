-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL,
    "modified_at" DATETIME NOT NULL
);
