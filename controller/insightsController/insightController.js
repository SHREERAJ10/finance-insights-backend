import insightOrchestrator from "../../orchestrator/insightOrchestrator.js";

const insightController = async (req, res) => {
    const { id, incomeData, expenseData, totalIncomeAmount, totalExpenseAmount } = req;
    const insightType = {
        incomeToExpenseRatio: "incomeToExpenseRatio",
        spendingLeakDetector: "spendingLeakDetector",
        savingGoalProgress: "savingGoalProgress",
        paretoStats: "paretoStats",
        fixedToVariableExpenseRatio: "fixedToVariableExpenseRatio"
    }
    const data = await insightOrchestrator(id, incomeData, expenseData, totalIncomeAmount, totalExpenseAmount);

    const response = (data.map((insightData) => {
        switch (insightData.insightType) {
            case insightType.incomeToExpenseRatio:
                return {
                    insightType: insightType.incomeToExpenseRatio,
                    insight: `For every dollar you earn, you spend $${insightData.insight.incomeToExpenseRatio}`,
                    subData: {
                        incomeToExpenseRatio: insightData.insight.incomeToExpenseRatio
                    }
                }
            case insightType.savingGoalProgress:
                switch (insightData.insight.goalStatus) {
                    case "achieved":
                        return {
                            insightType: insightType.savingGoalProgress,
                            insight: "You have successfully achieved your saving goal for this month",
                            subData: {
                                progressPercentage: insightData.insight.progressPercentage
                            }
                        }
                    case "surpassed":
                        return {
                            insightType: insightType.savingGoalProgress,
                            insight: `You have successfully achieved and surpassed your saving goal for this month by $${insightData.insight.surpassedAmount}`,
                            subData: {
                                progressPercentage: insightData.insight.progressPercentage,
                                surpassedAmount: insightData.insight.surpassedAmount
                            }
                        }
                    case "regressing":
                        return {
                            insightType: insightType.savingGoalProgress,
                            insight: `You have been regressing. You have overspent $${insightData.insight.overspentAmount}`,
                            subData: {
                                progressPercentage: insightData.insight.progressPercentage,
                                overspentAmount: insightData.insight.overspentAmount,
                                amountNeededToHitSavingGoal: insightData.insight.amountNeededToHitSavingGoal
                            }
                        }
                    case "noProgress":
                        return {
                            insightType: insightType.savingGoalProgress,
                            insight: `You have made zero progress towards saving goal. Your expenses is equal to your income.`,
                            subData: {
                                progressPercentage: insightData.insight.progressPercentage,
                                amountNeededToHitSavingGoal: insightData.insight.amountNeededToHitSavingGoal
                            }
                        }
                }

            case insightType.spendingLeakDetector:
                return {
                    insightType: insightType.spendingLeakDetector,
                    insight: insightData.insight.map((data) => {
                        if (data.isFixed) {
                            return {
                                insight: `Fixed Category: ${data.expenseCategory} made up ${data.expensePercentage}% of your expenses this month, which equates to $${data.expenseAmount}`
                            }
                        }
                        else {
                            return {
                                insight: `Non-Fixed Category: ${data.expenseCategory} made up ${data.expensePercentage}% of your expenses this month, which equates to $${data.expenseAmount}`
                            }
                        }
                    }
                    )
                }

            case insightType.fixedToVariableExpenseRatio:
                return {
                    insightType: insightType.fixedToVariableExpenseRatio,
                    insight: (() => {
                        if (insightData.insight.fixedExpensePercentage > insightData.insight.nonFixedExpensePercentage) {
                            return {
                                insight1: `You have ${insightData.insight.fixedExpensePercentage} Fixed Expenses - Hard to reduce`,
                                insight2: `You have ${insightData.insight.nonFixedExpensePercentage} Variable Expenses - your reduction options are limited`
                            }
                        }
                        else if (insightData.insight.fixedExpensePercentage < insightData.insight.nonFixedExpensePercentage) {
                            return {
                                insight1: `You have ${insightData.insight.fixedExpensePercentage} Fixed Expenses - You have more flexibility to reduce costs.`,
                                insight2: `You have ${insightData.insight.nonFixedExpensePercentage} Variable Expenses - you have plenty of room to adjust your spending.`
                            }
                        }
                        else {
                            return {
                                insight1: `Your expenses are evenly split between fixed and variable categories.`,
                                insight2: `You have a balanced spending profile — half of your costs are essential, and half are adjustable.`
                            }
                        }
                    })()
                }
            case insightType.paretoStats:
                return {
                    insightType: insightType.paretoStats,
                    insight:`${insightData.insight.paretoPercentage}% of categories (${insightData.insight.categoriesResponsible.join(", ")}) account for 80% of your expenses — your strongest optimization targets.`
                }
        }
    }));

    res.status(200).json({ 'success': true, 'data': response });
}

export default insightController;