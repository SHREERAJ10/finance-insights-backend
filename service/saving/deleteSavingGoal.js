import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const deleteSavingGoal = async (savingGoalId)=>{
    await prisma.saving_Goal.delete({
        where:{
            savingGoalId: savingGoalId
        }
    });
}

export default deleteSavingGoal;