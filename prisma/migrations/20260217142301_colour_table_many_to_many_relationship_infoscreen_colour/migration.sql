/*
  Warnings:

  - You are about to drop the column `style` on the `InfoScreen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InfoScreen" DROP COLUMN "style";

-- CreateTable
CREATE TABLE "Colour" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "oklch" TEXT NOT NULL,

    CONSTRAINT "Colour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColourInfoScreen" (
    "colourId" TEXT NOT NULL,
    "infoScreenId" TEXT NOT NULL,

    CONSTRAINT "ColourInfoScreen_pkey" PRIMARY KEY ("colourId","infoScreenId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Colour_name_key" ON "Colour"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Colour_oklch_key" ON "Colour"("oklch");

-- AddForeignKey
ALTER TABLE "ColourInfoScreen" ADD CONSTRAINT "ColourInfoScreen_colourId_fkey" FOREIGN KEY ("colourId") REFERENCES "Colour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColourInfoScreen" ADD CONSTRAINT "ColourInfoScreen_infoScreenId_fkey" FOREIGN KEY ("infoScreenId") REFERENCES "InfoScreen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
