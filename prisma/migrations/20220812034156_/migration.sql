/*
  Warnings:

  - A unique constraint covering the columns `[business_id,user_id]` on the table `association_table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `association_table_business_id_user_id_key` ON `association_table`(`business_id`, `user_id`);
