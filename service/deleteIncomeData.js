import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const deleteIncomeData = async (incomeId)=>{
    await prisma.income_Data.delete({
        where:{
            incomeId:incomeId
        }
    });
}

export default deleteIncomeData;