import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const deleteExpenseCategory= async (expenseCategoryId)=>{
    await prisma.expense_Data.deleteMany({
        where:{
            expenseCategoryId:expenseCategoryId,
        }
    })
    await prisma.expense_Category.delete({
        where:{
            id:expenseCategoryId
        }
    });
}

export default deleteExpenseCategory;