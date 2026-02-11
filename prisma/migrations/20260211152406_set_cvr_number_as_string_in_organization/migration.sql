/*
  Warnings:

  - Made the column `cvrNumber` on table `Organization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "cvrNumber" SET NOT NULL,
ALTER COLUMN "cvrNumber" SET DATA TYPE TEXT;
