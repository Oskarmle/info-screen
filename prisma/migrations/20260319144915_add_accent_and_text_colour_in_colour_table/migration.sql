/*
  Warnings:

  - Added the required column `accent` to the `Colour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textColour` to the `Colour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Colour" ADD COLUMN     "accent" TEXT NOT NULL,
ADD COLUMN     "textColour" TEXT NOT NULL;
