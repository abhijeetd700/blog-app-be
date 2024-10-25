/*
  Warnings:

  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_url` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `img_url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `img_url` VARCHAR(191) NOT NULL;
