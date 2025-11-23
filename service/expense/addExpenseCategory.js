import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const addExpenseCategory = async (userId, expenseCategory, isFixed)=>{
    await prisma.expense_Category.create({
        data:{
            userId: userId,
            expenseCategory:expenseCategory,
            isFixed:isFixed
        }
    });
}

export default addExpenseCategory;