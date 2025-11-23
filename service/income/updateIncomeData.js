import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const updateIncomeData = async (incomeId, incomeAmount, incomeSourceId)=>{
    await prisma.income_Data.update({
        where:{
            incomeId:incomeId
        },
        data:{
            incomeAmount:incomeAmount,
            incomeSourceId:incomeSourceId,
            updatedAt: new Date()
        }
    });
}

export default updateIncomeData;