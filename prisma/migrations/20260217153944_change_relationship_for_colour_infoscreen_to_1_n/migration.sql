/*
  Warnings:

  - You are about to drop the `ColourInfoScreen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ColourInfoScreen" DROP CONSTRAINT "ColourInfoScreen_colourId_fkey";

-- DropForeignKey
ALTER TABLE "ColourInfoScreen" DROP CONSTRAINT "ColourInfoScreen_infoScreenId_fkey";

-- AlterTable
ALTER TABLE "InfoScreen" ADD COLUMN     "colourId" TEXT;

-- DropTable
DROP TABLE "ColourInfoScreen";

-- AddForeignKey
ALTER TABLE "InfoScreen" ADD CONSTRAINT "InfoScreen_colourId_fkey" FOREIGN KEY ("colourId") REFERENCES "Colour"("id") ON DELETE SET NULL ON UPDATE CASCADE;
