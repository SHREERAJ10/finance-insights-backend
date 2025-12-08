import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const spendingLeakDetector = async ( expenseData, totalExpenseAmount) => {

    const expenseDataByCategory = new Object();
    for (let data of expenseData) {
        const key = data.expenseCategoryId;
        if (key in expenseDataByCategory) {
            expenseDataByCategory[key] += data.expenseAmount;
        }
        else {
            expenseDataByCategory[key] = data.expenseAmount;
        }
    }


    //array of expenseCategoryId (no repeat)
    const expenseCategoryId = Object.keys(expenseDataByCategory)
    let expenseCategoryAndFixed = [];

    for(let id of expenseCategoryId){
        const record = await prisma.expense_Category.findUnique({
            where:{
                id:id
            },
            select:{
                id:true,
                isFixed: true,
            }
        });
        expenseCategoryAndFixed.push(record);
    }

    //mixed data i.e. array of objects containing data for both fixed and non-fixed expenses
    const arr = expenseCategoryAndFixed.map((dataObj)=>{
        for(let data of expenseData){
            const key = data.expenseCategoryId;
            if(key == dataObj.id){
                if("amount" in dataObj){
                    dataObj.amount += data.expenseAmount;
                }
                else{
                    dataObj.amount = data.expenseAmount;
                }
            }
        }
        return dataObj;
    });
    
    const fixedExpenseData = arr.filter(data=> data.isFixed == true);
    const nonFixedExpenseData = arr.filter(data=> data.isFixed == false);

    const highestFixedExpenseData = fixedExpenseData.reduce((maxExpenseEntry, currExpenseEntry)=>{
        return currExpenseEntry.amount > maxExpenseEntry.amount?currExpenseEntry:maxExpenseEntry;
    });

    const highestNonFixedExpenseData = nonFixedExpenseData.reduce((maxExpenseEntry, currExpenseEntry) => {
        return currExpenseEntry.amount > maxExpenseEntry.amount?currExpenseEntry:maxExpenseEntry;
    });

    //highest fixed expense percentage

    const highestFixedExpensePercentage = ((highestFixedExpenseData.amount/totalExpenseAmount)*100).toFixed(2);
    const highestNonFixedExpensePercentage = ((highestNonFixedExpenseData.amount/totalExpenseAmount)*100).toFixed(2);

    //expense category
    
    const highestFixedExpenseCategory = (await prisma.expense_Category.findUnique({
        where:{
            id:highestFixedExpenseData.id
        },
        select:{
            expenseCategory:true
        }
    })).expenseCategory;

    const highestNonFixedExpenseCategory = (await prisma.expense_Category.findUnique({
        where:{
            id:highestNonFixedExpenseData.id
        },
        select:{
            expenseCategory:true
        }
    })).expenseCategory;

    const insightData = [
        {
            isFixed:true,
            expenseCategory: highestFixedExpenseCategory,
            expenseAmount: highestFixedExpenseData.amount,
            expensePercentage: highestFixedExpensePercentage,
        },
        {
            isFixed:false,
            expenseCategory: highestNonFixedExpenseCategory,
            expenseAmount: highestNonFixedExpenseData.amount,
            expensePercentage: highestNonFixedExpensePercentage,
        },
    ];

    

    return insightData;
}

export default spendingLeakDetector;