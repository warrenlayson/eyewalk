-- AlterTable
ALTER TABLE "DeviceMetadata" ADD COLUMN     "baseLatitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "baseLongitude" DOUBLE PRECISION NOT NULL DEFAULT 0;