/*
  Warnings:

  - The primary key for the `CaneUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Device` table. All the data in the column will be lost.
  - The primary key for the `DeviceMetadata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `caneUserId` on the `DeviceMetadata` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[deviceMetadataId]` on the table `CaneUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceMetadataId` to the `CaneUser` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `CaneUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `deviceMetadataId` on the `Device` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `DeviceMetadata` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_deviceMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_userId_fkey";

-- DropForeignKey
ALTER TABLE "DeviceMetadata" DROP CONSTRAINT "DeviceMetadata_caneUserId_fkey";

-- AlterTable
ALTER TABLE "CaneUser" DROP CONSTRAINT "CaneUser_pkey",
ADD COLUMN     "deviceMetadataId" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "CaneUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "userId",
ADD COLUMN     "ownerId" UUID,
DROP COLUMN "deviceMetadataId",
ADD COLUMN     "deviceMetadataId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "DeviceMetadata" DROP CONSTRAINT "DeviceMetadata_pkey",
DROP COLUMN "caneUserId",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "DeviceMetadata_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "CaneUser_deviceMetadataId_key" ON "CaneUser"("deviceMetadataId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceMetadataId_key" ON "Device"("deviceMetadataId");

-- AddForeignKey
ALTER TABLE "CaneUser" ADD CONSTRAINT "CaneUser_deviceMetadataId_fkey" FOREIGN KEY ("deviceMetadataId") REFERENCES "DeviceMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_deviceMetadataId_fkey" FOREIGN KEY ("deviceMetadataId") REFERENCES "DeviceMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
