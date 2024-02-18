/*
  Warnings:

  - You are about to drop the `RoutineActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoutineActivity" DROP CONSTRAINT "RoutineActivity_activityId_fkey";

-- DropForeignKey
ALTER TABLE "RoutineActivity" DROP CONSTRAINT "RoutineActivity_routineId_fkey";

-- DropTable
DROP TABLE "RoutineActivity";

-- CreateTable
CREATE TABLE "_ActivityToRoutine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToRoutine_AB_unique" ON "_ActivityToRoutine"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToRoutine_B_index" ON "_ActivityToRoutine"("B");

-- AddForeignKey
ALTER TABLE "_ActivityToRoutine" ADD CONSTRAINT "_ActivityToRoutine_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToRoutine" ADD CONSTRAINT "_ActivityToRoutine_B_fkey" FOREIGN KEY ("B") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
