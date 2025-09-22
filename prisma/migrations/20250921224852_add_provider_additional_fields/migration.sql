-- AlterTable
ALTER TABLE "provider_profiles" ADD COLUMN "averageJobValue" REAL;
ALTER TABLE "provider_profiles" ADD COLUMN "averageJobValueUnit" TEXT;
ALTER TABLE "provider_profiles" ADD COLUMN "experienceUnit" TEXT;

-- CreateTable
CREATE TABLE "formations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "providerId" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "certificateUrl" TEXT,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "formations_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
