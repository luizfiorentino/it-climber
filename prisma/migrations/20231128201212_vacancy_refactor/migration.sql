/*
  Warnings:

  - The primary key for the `Vacancy` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_VacancyToTag" DROP CONSTRAINT "_VacancyToTag_B_fkey";

-- AlterTable
ALTER TABLE "Vacancy" DROP CONSTRAINT "Vacancy_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Vacancy_id_seq";

-- AlterTable
ALTER TABLE "_VacancyToTag" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_VacancyToTag" ADD CONSTRAINT "_VacancyToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
