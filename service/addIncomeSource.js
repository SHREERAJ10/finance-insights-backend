import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const addIncomeSource = async (userId, incomeSource, isFixed)=>{

    await prisma.income_Source.create({
        data:{
            userId: userId,
            incomeSource: incomeSource,
            isFixed: isFixed
        }
    });
}

export default addIncomeSource;