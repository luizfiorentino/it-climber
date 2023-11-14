-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "feedback" TEXT,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);
