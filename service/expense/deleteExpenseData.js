import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const deleteExpenseData = async (expenseId)=>{
    await prisma.expense_Data.delete({
        where:{
            expenseId:expenseId
        }
    });
}

export default deleteExpenseData;