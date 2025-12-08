
const incomeToExpenseRatio = async (totalIncomeAmount, totalExpenseAmount)=>{

    //calculation: income to expense ratio

    const incomeToExpenseRatio = Number((totalExpenseAmount/totalIncomeAmount).toFixed(2));
    return incomeToExpenseRatio;

}

export default incomeToExpenseRatio;