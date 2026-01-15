import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getExpenseCategory = async (userId)=>{

    const expenseCategories = await prisma.expense_Category.findMany({
        select:{
            id: true,
            expenseCategory: true,
            isFixed:true
        },
        where:{
            userId:userId,
        },
    });

    return expenseCategories;
}

export default getExpenseCategory;