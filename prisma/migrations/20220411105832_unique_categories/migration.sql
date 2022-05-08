/*
  Warnings:

  - You are about to alter the column `password` on the `Businesses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - A unique constraint covering the columns `[category]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Businesses" ALTER COLUMN "password" SET DATA TYPE VARCHAR(40);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_key" ON "Categories"("category");
