-- AlterTable
ALTER TABLE "DeviceMetadata" ADD COLUMN     "x" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "y" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "z" DOUBLE PRECISION NOT NULL DEFAULT 0;
