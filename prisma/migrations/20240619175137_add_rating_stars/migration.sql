/*
  Warnings:

  - Added the required column `stars` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "faq" TEXT,
    "price" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "stat" TEXT NOT NULL,
    "stars" INTEGER NOT NULL
);
INSERT INTO "new_Product" ("about", "faq", "id", "name", "price", "stat", "value") SELECT "about", "faq", "id", "name", "price", "stat", "value" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
