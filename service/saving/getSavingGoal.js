import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getSavingGoal = async (userId, currDate) => {
  const savingGoal = await prisma.saving_Goal.findUnique({
    select: {
      savingGoalId: true,
      savingGoalAmount: true,
      createdAt: true,
    },
    where: {
      userMonthId: {
        userId: userId,
        createdAt: currDate,
      },
    },
  });

  return savingGoal;
};

export default getSavingGoal;
