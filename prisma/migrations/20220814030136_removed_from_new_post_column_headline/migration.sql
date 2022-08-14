/*
  Warnings:

  - Made the column `headline` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `headline` VARCHAR(255) NOT NULL;
