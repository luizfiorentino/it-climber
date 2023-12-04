-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "applicationDate" TIMESTAMP(3),
ADD COLUMN     "language" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "recruiter" TEXT;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VacancyToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VacancyToTag_AB_unique" ON "_VacancyToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_VacancyToTag_B_index" ON "_VacancyToTag"("B");

-- AddForeignKey
ALTER TABLE "_VacancyToTag" ADD CONSTRAINT "_VacancyToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VacancyToTag" ADD CONSTRAINT "_VacancyToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
