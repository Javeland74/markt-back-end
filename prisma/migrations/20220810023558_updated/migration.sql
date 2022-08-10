/*
  Warnings:

  - The values [Business] on the enum `businesses_business_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `businesses` MODIFY `business_type` ENUM('Beauty', 'Food', 'Coffee', 'BusinessService', 'Hobbies', 'Other') NOT NULL;
