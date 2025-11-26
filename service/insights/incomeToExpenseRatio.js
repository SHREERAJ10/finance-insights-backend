import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

const incomeToExpenseRatio = async (userId)=>{
    
    let totalIncomeAmount = 0;
    let totalExpenseAmount = 0;

    //Income Data

    const incomeData = await prisma.income_Data.findMany({
        where:{
            userId:userId,
        }
    });

    const validDate = incomeData.filter((data)=>{
        const date = data.createdAt;
        const today = new Date();
        return today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth();
    });


    const validIncomeData = [];

    for(let i=0;i<validDate.length;i++){
        const incomeRecord = await prisma.income_Data.findUnique({
            where:{
                incomeId: validDate[i].incomeId
            },
        });

        validIncomeData.push(incomeRecord);
    }

    for(let i=0; i<validIncomeData.length;i++){
        totalIncomeAmount += validIncomeData[i].incomeAmount;
    }

    //Expense Data

    const expenseData = await prisma.expense_Data.findMany({
        where:{
            userId:userId,
        }
    });

    const validExpenseData = expenseData.filter((data)=>{
        const date = data.createdAt;
        const today = new Date();
        return today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth();
    });

    const requiredExpenseData = [];

    for(let i=0;i<validExpenseData.length;i++){
        const expenseRecord = await prisma.expense_Data.findUnique({
            where:{
                expenseId: validExpenseData[i].expenseId
            },
        });

        requiredExpenseData.push(expenseRecord);
    }

    for(let i=0; i<requiredExpenseData.length;i++){
        totalExpenseAmount += requiredExpenseData[i].expenseAmount;
    }

    //calculation: income to expense ratio

    const incomeToExpenseRatio = (totalIncomeAmount/totalExpenseAmount).toFixed(2);

    return incomeToExpenseRatio;

}

export default incomeToExpenseRatio;