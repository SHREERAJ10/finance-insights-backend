import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fixedToVariableExpenseRatio = async (expenseData, totalExpenseAmount) => {
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

    const fixedExpenseData = arr.filter(data => data.isFixed == true);
    const nonFixedExpenseData = arr.filter(data => data.isFixed == false);

    const fixedExpenseSum = fixedExpenseData.reduce((sum, currData) => sum += currData.amount, 0);
    const nonFixedExpenseSum = nonFixedExpenseData.reduce((sum, currData) => sum += currData.amount, 0);

    const fixedExpensePercentage = Number(((fixedExpenseSum / totalExpenseAmount) * 100).toFixed(2));
    const nonFixedExpensePercentage = Number(((nonFixedExpenseSum / totalExpenseAmount) * 100).toFixed(2));

    return { fixedExpensePercentage: fixedExpensePercentage, nonFixedExpensePercentage: nonFixedExpensePercentage };

}

export default fixedToVariableExpenseRatio;