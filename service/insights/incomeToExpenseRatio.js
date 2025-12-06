import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

const incomeToExpenseRatio = async (totalIncomeAmount, totalExpenseAmount)=>{

    //calculation: income to expense ratio

    const incomeToExpenseRatio = (totalExpenseAmount/totalIncomeAmount).toFixed(2);

    return incomeToExpenseRatio;

}

export default incomeToExpenseRatio;