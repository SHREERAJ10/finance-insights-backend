import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getYearAndMonth = ()=>{
    const date = new Date();
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
}

const addSavingGoal = async (userId, savingGoalAmount)=>{
    await prisma.saving_Goal.create({
        data:{
            userId: userId,
            savingGoalAmount: savingGoalAmount,
            createdAt: getYearAndMonth()
        }
    });
}

export default addSavingGoal;