/*
  Warnings:

  - You are about to drop the column `testingKitsAvailable` on the `Drug` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LacingPrevalence" AS ENUM ('HIGH', 'MODERATE', 'LOW', 'RARE');

-- AlterTable
ALTER TABLE "Drug" DROP COLUMN "testingKitsAvailable",
ADD COLUMN     "aliases" TEXT[],
ADD COLUMN     "halfLife" DOUBLE PRECISION,
ADD COLUMN     "harmReductionTips" TEXT[],
ADD COLUMN     "lacingPrevalence" "LacingPrevalence",
ADD COLUMN     "onsetTime" DOUBLE PRECISION,
ADD COLUMN     "testingKits" TEXT[];
