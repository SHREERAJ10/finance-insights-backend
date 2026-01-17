import fixedToVariableExpenseRatio from "../service/insights/fixedToVariableExpenseRatio.js";
import incomeToExpenseRatio from "../service/insights/incomeToExpenseRatio.js";
import paretoStats from "../service/insights/paretoStats.js";
import savingGoalProgress from "../service/insights/savingGoalProgress.js";
import spendingLeakDetector from "../service/insights/spendingLeakDetector.js";

const insightOrchestrator = async (id, incomeData, expenseData, totalIncomeAmount, totalExpenseAmount)=>{
    const returnData = [];

    const incomeToExpenseRatioData = await incomeToExpenseRatio(totalIncomeAmount, totalExpenseAmount);
    const incomeToExpenseRatioResponse = {
        insightType: "incomeToExpenseRatio",
        insight: {
            incomeToExpenseRatio:incomeToExpenseRatioData
        }
    };

    const savingGoalProgressData = await savingGoalProgress(id, totalIncomeAmount, totalExpenseAmount);
    const savingGoalProgressResponse = {
        insightType: "savingGoalProgress",
        insight:savingGoalProgressData
    }

    const spendingLeakDetectorData = await spendingLeakDetector( expenseData, totalExpenseAmount);
    const spendingLeakDetectorResponse = {
        insightType:"spendingLeakDetector",
        insight: spendingLeakDetectorData
    }

    const paretoStatsData = await paretoStats(expenseData, totalExpenseAmount);
    const paretoStatsResponse = {
        insightType:"paretoStats",
        insight:paretoStatsData
    }

    const fixedToVariableExpenseRatioData = await fixedToVariableExpenseRatio(expenseData, totalExpenseAmount);
    const fixedToVariableExpenseRatioResponse = {
        insightType:"fixedToVariableExpenseRatio",
        insight:fixedToVariableExpenseRatioData
    }



    returnData.push(incomeToExpenseRatioResponse, savingGoalProgressResponse, spendingLeakDetectorResponse, paretoStatsResponse, fixedToVariableExpenseRatioResponse );

    return returnData;

}

export default insightOrchestrator;