import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getInsightsData = async (req, res, next)=>{

    const userId = req.uid;
    let totalIncomeAmount = 0;
    let totalExpenseAmount = 0;

    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth()+1, 0);

    //Income Data

    const incomeData = await prisma.income_Data.findMany({
        where:{
            userId:userId,
            createdAt:{
                gte:startDate,
                lte:endDate
            }
        }
    });
    
    for(let i=0; i<incomeData.length;i++){
        totalIncomeAmount += incomeData[i].incomeAmount;
    }


    //Expense Data

    const expenseData = await prisma.expense_Data.findMany({
        where:{
            userId:userId,
            createdAt:{
                gte:startDate,
                lte:endDate
            }
        }
    });

    for(let i=0; i<expenseData.length;i++){
        totalExpenseAmount += expenseData[i].expenseAmount;
    }

    req.incomeData = incomeData;
    req.expenseData = expenseData;
    req.totalExpenseAmount = totalExpenseAmount;
    req.totalIncomeAmount=totalIncomeAmount;
    next();
}

export default getInsightsData;