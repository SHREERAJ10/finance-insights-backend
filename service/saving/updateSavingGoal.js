import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getYearAndMonth = ()=>{
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

const updateSavingGoal = async (savingGoalId, savingGoalAmount)=>{
    await prisma.saving_Goal.update({
        where:{
            savingGoalId: savingGoalId
        },
        data:{
            savingGoalAmount: savingGoalAmount,
            updatedAt: getYearAndMonth()
        }
    });
}

export default updateSavingGoal;