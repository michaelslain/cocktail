/*
  Warnings:

  - You are about to drop the column `aliases` on the `Drug` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Drug` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drug" DROP COLUMN "aliases",
DROP COLUMN "name",
ADD COLUMN     "names" TEXT[];
