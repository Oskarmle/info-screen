/*
  Warnings:

  - Made the column `accent` on table `Colour` required. This step will fail if there are existing NULL values in that column.
  - Made the column `textColour` on table `Colour` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Colour" ALTER COLUMN "accent" SET NOT NULL,
ALTER COLUMN "textColour" SET NOT NULL;
