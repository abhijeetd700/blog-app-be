/*
  Warnings:

  - You are about to alter the column `title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `title` VARCHAR(50) NOT NULL,
    MODIFY `content` VARCHAR(5000) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `username` VARCHAR(10) NOT NULL,
    MODIFY `email` VARCHAR(50) NOT NULL;
