/*
  Warnings:

  - You are about to alter the column `category` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `category` ENUM('ART', 'SCIENCE', 'SPORTS', 'TECHNOLOGY', 'GLOBAL', 'FINTECH') NULL;
