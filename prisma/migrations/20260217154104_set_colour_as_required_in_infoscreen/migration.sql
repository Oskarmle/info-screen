/*
  Warnings:

  - Made the column `colourId` on table `InfoScreen` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InfoScreen" DROP CONSTRAINT "InfoScreen_colourId_fkey";

-- AlterTable
ALTER TABLE "InfoScreen" ALTER COLUMN "colourId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "InfoScreen" ADD CONSTRAINT "InfoScreen_colourId_fkey" FOREIGN KEY ("colourId") REFERENCES "Colour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
