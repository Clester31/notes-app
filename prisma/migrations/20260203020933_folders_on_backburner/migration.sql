/*
  Warnings:

  - You are about to drop the column `folderId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentFolderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_folderId_fkey";

-- DropIndex
DROP INDEX "Note_folderId_idx";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "folderId";

-- DropTable
DROP TABLE "Folder";
