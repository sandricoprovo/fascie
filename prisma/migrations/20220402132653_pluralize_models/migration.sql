/*
  Warnings:

  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testimonial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Business_Categories" DROP CONSTRAINT "Business_Categories_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Business_Categories" DROP CONSTRAINT "Business_Categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Business_Followers" DROP CONSTRAINT "Business_Followers_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Business_Followers" DROP CONSTRAINT "Business_Followers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_businessId_fkey";

-- DropTable
DROP TABLE "Business";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Testimonial";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Businesses" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerName" VARCHAR(255) NOT NULL,
    "businessName" VARCHAR(255) NOT NULL,
    "hasPaidFee" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "password" VARCHAR(30) NOT NULL,
    "hasShipping" BOOLEAN NOT NULL,
    "bannerImg" VARCHAR(150),
    "website" VARCHAR(150),
    "twitter" VARCHAR(150),
    "facebook" VARCHAR(150),
    "instagram" VARCHAR(150),
    "locationId" INTEGER NOT NULL,
    "keywords" TEXT[],

    CONSTRAINT "Businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "provinceState" VARCHAR(200) NOT NULL,
    "country" VARCHAR(200) NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonials" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "testimonial" VARCHAR(255) NOT NULL,
    "businessId" INTEGER NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" VARCHAR(100) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Businesses_email_key" ON "Businesses"("email");

-- AddForeignKey
ALTER TABLE "Businesses" ADD CONSTRAINT "Businesses_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business_Followers" ADD CONSTRAINT "Business_Followers_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business_Followers" ADD CONSTRAINT "Business_Followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business_Categories" ADD CONSTRAINT "Business_Categories_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business_Categories" ADD CONSTRAINT "Business_Categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
