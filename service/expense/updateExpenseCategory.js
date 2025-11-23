import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const updateExpenseCategory = async (expenseCategoryId, expenseCategory, isFixed)=>{
    await prisma.expense_Category.update({
        where:{
            id: expenseCategoryId
        },
        data:{
            expenseCategory: expenseCategory,
            isFixed: isFixed
        }
    });
}

export default updateExpenseCategory;