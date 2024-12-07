-- CreateTable
CREATE TABLE "Drug" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dangerousDosage" DOUBLE PRECISION NOT NULL,
    "overdoseDosage" DOUBLE PRECISION NOT NULL,
    "testingKitsAvailable" TEXT[],
    "mainEffects" TEXT[],
    "negativeSideEffects" TEXT[],
    "dosageUnits" TEXT NOT NULL,

    CONSTRAINT "Drug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DrugInteractions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DrugLacing" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DrugInteractions_AB_unique" ON "_DrugInteractions"("A", "B");

-- CreateIndex
CREATE INDEX "_DrugInteractions_B_index" ON "_DrugInteractions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DrugLacing_AB_unique" ON "_DrugLacing"("A", "B");

-- CreateIndex
CREATE INDEX "_DrugLacing_B_index" ON "_DrugLacing"("B");

-- AddForeignKey
ALTER TABLE "_DrugInteractions" ADD CONSTRAINT "_DrugInteractions_A_fkey" FOREIGN KEY ("A") REFERENCES "Drug"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrugInteractions" ADD CONSTRAINT "_DrugInteractions_B_fkey" FOREIGN KEY ("B") REFERENCES "Drug"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrugLacing" ADD CONSTRAINT "_DrugLacing_A_fkey" FOREIGN KEY ("A") REFERENCES "Drug"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrugLacing" ADD CONSTRAINT "_DrugLacing_B_fkey" FOREIGN KEY ("B") REFERENCES "Drug"("id") ON DELETE CASCADE ON UPDATE CASCADE;
