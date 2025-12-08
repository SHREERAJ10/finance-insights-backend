import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


const savingGoalProgress = async (userId, totalIncomeAmount, totalExpenseAmount) => {

    let progressPercentage = 0;
    let amountNeededToHitSavingGoal;
    let goalStatus;
    let currSavingAmount;
    let overspentAmount = 0;
    let surpassedAmount = 0;
    const goalStates = {
        achieved: "achieved",
        surpassed: "surpassed",
        regressing: "regressing",
        noProgress: "noProgress"
    }

    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const savingGoal = (await prisma.saving_Goal.findFirst({
        where: {
            userId: userId,
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        },
        select: {
            savingGoalAmount: true
        }
    })).savingGoalAmount;

    //progress percentage

    if (totalIncomeAmount > totalExpenseAmount) {
        progressPercentage = (((totalIncomeAmount - totalExpenseAmount) / savingGoal) * 100).toFixed(2);
    }
    else {
        progressPercentage = 0;
    }

    //amount needed to hit saving goal

    if (totalIncomeAmount > totalExpenseAmount) {
        currSavingAmount = totalIncomeAmount - totalExpenseAmount;
        if (currSavingAmount < savingGoal) {
            amountNeededToHitSavingGoal = savingGoal - currSavingAmount;
        }
        else if (currSavingAmount > savingGoal) {
            //already beyond saving goal i.e. very good!
            amountNeededToHitSavingGoal = 0;
            goalStatus = goalStates.surpassed;
            surpassedAmount = currSavingAmount - savingGoal;
        }
        else {
            //just hit saving goal, keep it up!
            amountNeededToHitSavingGoal = 0;
            goalStatus = goalStates.achieved;
        }
    }
    else if (totalIncomeAmount < totalExpenseAmount) {
        //no saving, no progress, insight: cut down expenses
        overspentAmount = totalExpenseAmount - totalIncomeAmount;
        amountNeededToHitSavingGoal = savingGoal + overspentAmount;
        goalStatus = goalStates.regressing;
    }
    else {
        //incomeAmount == expenseAmount; lives paycheck to paycheck. increase income or cut down expenses.
        amountNeededToHitSavingGoal = savingGoal;
        goalStatus = goalStates.noProgress;
    }

    return { progressPercentage: progressPercentage, amountNeededToHitSavingGoal: amountNeededToHitSavingGoal, goalStatus: goalStatus, overspentAmount: overspentAmount, surpassedAmount: surpassedAmount };
}

export default savingGoalProgress;