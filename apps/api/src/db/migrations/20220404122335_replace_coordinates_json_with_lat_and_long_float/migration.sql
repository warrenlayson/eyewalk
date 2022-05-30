/*
  Warnings:

  - You are about to drop the column `coordinates` on the `DeviceMetadata` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `DeviceMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `DeviceMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceMetadata" DROP COLUMN "coordinates",
ADD COLUMN     "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
