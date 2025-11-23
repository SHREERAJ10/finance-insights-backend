import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const updateExpenseData = async ( expenseId, expenseCategoryId, expenseAmount,  expenseDescription)=>{
    await prisma.expense_Data.update({
        where:{
            expenseId:expenseId
        },
        data:{
            expenseAmount:expenseAmount,
            expenseDescription: expenseDescription,
            expenseCategoryId:expenseCategoryId,
            updatedAt: new Date()
        }
    });
}

export default updateExpenseData;