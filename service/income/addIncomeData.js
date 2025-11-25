import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const addIncomeData = async (userId, incomeAmount, incomeSourceId)=>{
    await prisma.income_Data.create({
        data:{
            userId: userId,
            incomeAmount: incomeAmount,
            incomeSourceId: incomeSourceId,
            createdAt: new Date()
        }
    });
}

export default addIncomeData;