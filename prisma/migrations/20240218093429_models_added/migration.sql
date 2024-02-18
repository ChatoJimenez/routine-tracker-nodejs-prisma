-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_frequency_fkey";

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_status_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "frequency" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "role" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Role"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_status_fkey" FOREIGN KEY ("status") REFERENCES "Status"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_frequency_fkey" FOREIGN KEY ("frequency") REFERENCES "Frecuency"("name") ON DELETE SET NULL ON UPDATE CASCADE;
