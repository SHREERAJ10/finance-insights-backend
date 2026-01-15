import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getIncomeSource = async (userId)=>{

    const incomeSources = await prisma.income_Source.findMany({
        select:{
            id: true,
            incomeSource: true,
            isFixed:true
        },
        where:{
            userId:userId,
        },
    });

    return incomeSources;
}

export default getIncomeSource;