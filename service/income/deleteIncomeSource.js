import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const deleteIncomeSource= async (incomeSourceId)=>{
    await prisma.income_Data.deleteMany({
        where:{
            incomeSourceId:incomeSourceId,
        }
    })
    await prisma.income_Source.delete({
        where:{
            id:incomeSourceId
        }
    });
}

export default deleteIncomeSource;