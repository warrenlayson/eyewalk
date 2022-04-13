/*
  Warnings:

  - You are about to drop the column `bound` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `caneUser` on the `DeviceMetadata` table. All the data in the column will be lost.
  - Added the required column `caneUserId` to the `DeviceMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_userId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "bound",
ADD COLUMN     "bounded" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DeviceMetadata" DROP COLUMN "caneUser",
ADD COLUMN     "caneUserId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CaneUser" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(70) NOT NULL,
    "lastName" VARCHAR(70) NOT NULL,

    CONSTRAINT "CaneUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeviceMetadata" ADD CONSTRAINT "DeviceMetadata_caneUserId_fkey" FOREIGN KEY ("caneUserId") REFERENCES "CaneUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
