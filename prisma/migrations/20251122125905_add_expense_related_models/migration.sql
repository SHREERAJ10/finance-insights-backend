-- CreateTable
CREATE TABLE "Expense_Data" (
    "expenseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expenseAmount" INTEGER NOT NULL,
    "expenseCategoryId" TEXT NOT NULL,
    "expenseDescription" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Expense_Data_pkey" PRIMARY KEY ("expenseId")
);

-- CreateTable
CREATE TABLE "Expense_Category" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expenseCategory" TEXT NOT NULL,
    "isFixed" BOOLEAN NOT NULL,

    CONSTRAINT "Expense_Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense_Data" ADD CONSTRAINT "Expense_Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense_Data" ADD CONSTRAINT "Expense_Data_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "Expense_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense_Category" ADD CONSTRAINT "Expense_Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
