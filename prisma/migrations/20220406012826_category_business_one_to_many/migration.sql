/*
  Warnings:

  - You are about to drop the `Business_Categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoriesId` to the `Businesses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business_Categories" DROP CONSTRAINT "Business_Categories_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Business_Categories" DROP CONSTRAINT "Business_Categories_categoryId_fkey";

-- AlterTable
ALTER TABLE "Businesses" ADD COLUMN     "categoriesId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Business_Categories";

-- AddForeignKey
ALTER TABLE "Businesses" ADD CONSTRAINT "Businesses_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
