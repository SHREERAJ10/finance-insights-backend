-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income_Data" (
    "incomeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "incomeAmount" INTEGER NOT NULL,
    "incomeSourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Income_Data_pkey" PRIMARY KEY ("incomeId")
);

-- CreateTable
CREATE TABLE "Income_Source" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "incomeSource" TEXT NOT NULL,
    "isFixed" BOOLEAN NOT NULL,

    CONSTRAINT "Income_Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saving_Goal" (
    "savingGoalId" TEXT NOT NULL,
    "savingGoalAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Saving_Goal_pkey" PRIMARY KEY ("savingGoalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Saving_Goal_userId_createdAt_key" ON "Saving_Goal"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "Income_Data" ADD CONSTRAINT "Income_Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income_Data" ADD CONSTRAINT "Income_Data_incomeSourceId_fkey" FOREIGN KEY ("incomeSourceId") REFERENCES "Income_Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income_Source" ADD CONSTRAINT "Income_Source_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saving_Goal" ADD CONSTRAINT "Saving_Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
