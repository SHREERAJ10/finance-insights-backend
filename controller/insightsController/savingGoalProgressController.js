import savingGoalProgress from "../../service/insights/savingGoalProgress.js";

const savingGoalProgressController = async (req, res, next)=>{
    const userId = req.uid;
    const totalIncomeAmount = req.totalIncomeAmount;
    const totalExpenseAmount = req.totalExpenseAmount;
    const {progressPercentage, amountNeededToHitSavingGoal, goalStatus, overspentAmount, surpassedAmount} = await savingGoalProgress(userId, totalIncomeAmount, totalExpenseAmount);
    next();
    
    switch(goalStatus){
        case "achieved":
            res.status(200).json({'success':true,'progressPercentage':progressPercentage,'amountNeededToHitSavingGoal':amountNeededToHitSavingGoal, 'message':"You have successfully achieved your saving goal for this month"});
            break;
        case "surpassed":
            res.status(200).json({'success':true,'progressPercentage':progressPercentage,'amountNeededToHitSavingGoal':amountNeededToHitSavingGoal, 'message':`You have successfully achieved and surpassed your saving goal for this month by $${surpassedAmount}`});
            break;
        case "regressing":
            res.status(200).json({'success':true,'progressPercentage':progressPercentage,'amountNeededToHitSavingGoal':amountNeededToHitSavingGoal, 'message':`You have been regressing. You have overspent $${overspentAmount}`});
            break;
        case "noProgress":
            res.status(200).json({'success':true,'progressPercentage':progressPercentage,'amountNeededToHitSavingGoal':amountNeededToHitSavingGoal, 'message':`You have made zero progress towards saving goal. Your expenses is equal to your income.`});
            break;
    }
}

export default savingGoalProgressController;