import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const addExpenseData = async (userId, expenseAmount, expenseDescription, expenseCategoryId)=>{
    await prisma.expense_Data.create({
        data:{
            userId:userId,
            expenseAmount:expenseAmount,
            expenseDescription:expenseDescription,
            expenseCategoryId:expenseCategoryId,
            createdAt: new Date()
        }
    })
}

export default addExpenseData;