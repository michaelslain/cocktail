/*
  Warnings:

  - You are about to drop the column `dangerousDosage` on the `Drug` table. All the data in the column will be lost.
  - You are about to drop the column `dosageUnits` on the `Drug` table. All the data in the column will be lost.
  - You are about to drop the column `maxRecommendedDosage` on the `Drug` table. All the data in the column will be lost.
  - You are about to drop the column `minRecommendedDosage` on the `Drug` table. All the data in the column will be lost.
  - You are about to drop the column `overdoseDosage` on the `Drug` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drug" DROP COLUMN "dangerousDosage",
DROP COLUMN "dosageUnits",
DROP COLUMN "maxRecommendedDosage",
DROP COLUMN "minRecommendedDosage",
DROP COLUMN "overdoseDosage";

-- CreateTable
CREATE TABLE "Dosage" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "drugId" TEXT NOT NULL,

    CONSTRAINT "Dosage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dosage" ADD CONSTRAINT "Dosage_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
