import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const paretoStats = async (expenseData, totalExpenseAmount) => {
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

    for (let id of expenseCategoryId) {
        const record = await prisma.expense_Category.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                isFixed: true,
            }
        });
        expenseCategoryAndFixed.push(record);
    }


    //mixed data i.e. array of objects containing data for both fixed and non-fixed expenses
    const arr = expenseCategoryAndFixed.map((dataObj) => {
        for (let data of expenseData) {
            const key = data.expenseCategoryId;
            if (key == dataObj.id) {
                if ("amount" in dataObj) {
                    dataObj.amount += data.expenseAmount;
                }
                else {
                    dataObj.amount = data.expenseAmount;
                }
            }
        }
        return dataObj;
    });

    const sortedArr = arr.toSorted((a, b) => b.amount - a.amount);

    for (let i = 0; i < sortedArr.length; i++) {
        if (i == 0) {
            sortedArr[i].cumulativeSum = sortedArr[i].amount;
        }
        else {
            sortedArr[i].cumulativeSum = sortedArr[i - 1].cumulativeSum + sortedArr[i].amount;
        }
        sortedArr[i].cumulativePercentage = Number(((sortedArr[i].cumulativeSum / totalExpenseAmount) * 100).toFixed(2));
        sortedArr[i].gapFromEighty = Number((80 - sortedArr[i].cumulativePercentage).toFixed(2));
    }

    const eighty = sortedArr.reduce((minVal, currVal) => {
        return currVal.gapFromEighty < minVal.gapFromEighty && currVal.gapFromEighty >= 0 ? currVal : minVal;
    });

    const noOfCategories = sortedArr.indexOf(eighty) + 1

    const categoriesResponsibleIds =  sortedArr.slice(0, noOfCategories);

    const categoriesResponsible = await Promise.all(categoriesResponsibleIds.map(async (data)=>{
        const expenseCategoryData = (await prisma.expense_Category.findUnique({
            where:{
                id:data.id
            },
            select:{
                expenseCategory:true
            }
        }))["expenseCategory"];
        return expenseCategoryData;
    }));
    
    const categoriesPercentage = Math.floor((noOfCategories/sortedArr.length)*100);
    
    const response = {
        categoriesResponsible: categoriesResponsible,
        paretoPercentage: categoriesPercentage
    }

    return response;
}

export default paretoStats;