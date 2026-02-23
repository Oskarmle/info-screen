/*
  Warnings:

  - You are about to drop the column `contact` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "contact",
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT;
