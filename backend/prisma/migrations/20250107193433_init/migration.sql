-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "Score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);
