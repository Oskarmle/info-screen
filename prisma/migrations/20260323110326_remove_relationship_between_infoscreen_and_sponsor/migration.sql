/*
  Warnings:

  - You are about to drop the `_SponsorInfoScreens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SponsorInfoScreens" DROP CONSTRAINT "_SponsorInfoScreens_A_fkey";

-- DropForeignKey
ALTER TABLE "_SponsorInfoScreens" DROP CONSTRAINT "_SponsorInfoScreens_B_fkey";

-- DropTable
DROP TABLE "_SponsorInfoScreens";
