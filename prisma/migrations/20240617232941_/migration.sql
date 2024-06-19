/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "faq" TEXT,
    "price" BIGINT NOT NULL,
    "value" INTEGER NOT NULL,
    "stat" TEXT NOT NULL
);
INSERT INTO "new_Product" ("about", "faq", "id", "name", "price", "stat", "value") SELECT "about", "faq", "id", "name", "price", "stat", "value" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
