/*
  Warnings:

  - You are about to drop the column `testingKits` on the `Drug` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drug" DROP COLUMN "testingKits",
ADD COLUMN     "testingKit" TEXT;
