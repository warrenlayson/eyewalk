-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Customer');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(70) NOT NULL,
    "lastName" VARCHAR(70) NOT NULL,
    "email" VARCHAR(70) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'Customer',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceMetadata" (
    "id" SERIAL NOT NULL,
    "coordinates" JSONB NOT NULL,
    "pulse" INTEGER NOT NULL,
    "batteryLevel" INTEGER NOT NULL,
    "responseTime" INTEGER NOT NULL,

    CONSTRAINT "DeviceMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "bound" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "deviceMetadataId" INTEGER NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceMetadataId_key" ON "Device"("deviceMetadataId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_deviceMetadataId_fkey" FOREIGN KEY ("deviceMetadataId") REFERENCES "DeviceMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
