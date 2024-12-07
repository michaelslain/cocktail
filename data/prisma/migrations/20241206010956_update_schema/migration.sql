/*
  Warnings:

  - You are about to drop the `_DrugInteractions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('LETHAL', 'DANGEROUS', 'PSYCHOLOGICALLY_DIFFICULT');

-- DropForeignKey
ALTER TABLE "_DrugInteractions" DROP CONSTRAINT "_DrugInteractions_A_fkey";

-- DropForeignKey
ALTER TABLE "_DrugInteractions" DROP CONSTRAINT "_DrugInteractions_B_fkey";

-- DropTable
DROP TABLE "_DrugInteractions";

-- CreateTable
CREATE TABLE "DrugInteraction" (
    "id" TEXT NOT NULL,
    "type" "InteractionType" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "DrugInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DrugToInteraction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DrugToInteraction_AB_unique" ON "_DrugToInteraction"("A", "B");

-- CreateIndex
CREATE INDEX "_DrugToInteraction_B_index" ON "_DrugToInteraction"("B");

-- AddForeignKey
ALTER TABLE "_DrugToInteraction" ADD CONSTRAINT "_DrugToInteraction_A_fkey" FOREIGN KEY ("A") REFERENCES "Drug"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrugToInteraction" ADD CONSTRAINT "_DrugToInteraction_B_fkey" FOREIGN KEY ("B") REFERENCES "DrugInteraction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
