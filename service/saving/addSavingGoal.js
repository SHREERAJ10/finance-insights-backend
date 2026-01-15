import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getYearAndMonth = ()=>{
    const date = new Date();
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
}

console.log(getYearAndMonth())

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