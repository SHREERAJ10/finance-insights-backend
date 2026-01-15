import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
 
const updateIncomeSource = async (incomeSourceId, incomeSource, isFixed)=>{
    console.log("I'm here")
    await prisma.income_Source.update({
        where:{
            id: incomeSourceId
        },
        data:{
            incomeSource: incomeSource,
            isFixed: isFixed
        }
    });
}

export default updateIncomeSource;