/*
  Warnings:

  - You are about to drop the column `mainEffects` on the `Drug` table. All the data in the column will be lost.
  - You are about to drop the column `negativeSideEffects` on the `Drug` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drug" DROP COLUMN "mainEffects",
DROP COLUMN "negativeSideEffects",
ADD COLUMN     "effects" TEXT[],
ADD COLUMN     "maxRecommendedDosage" DOUBLE PRECISION,
ADD COLUMN     "minRecommendedDosage" DOUBLE PRECISION;
