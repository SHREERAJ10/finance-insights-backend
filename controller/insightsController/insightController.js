import insightOrchestrator from "../../orchestrator/insightOrchestrator.js";

const insightController = async (req, res) => {
  const { id, incomeData, expenseData, totalIncomeAmount, totalExpenseAmount } =
    req;
  const insightType = {
    incomeToExpenseRatio: "incomeToExpenseRatio",
    spendingLeakDetector: "spendingLeakDetector",
    savingGoalProgress: "savingGoalProgress",
    paretoStats: "paretoStats",
    fixedToVariableExpenseRatio: "fixedToVariableExpenseRatio",
  };
  const data = await insightOrchestrator(
    id,
    incomeData,
    expenseData,
    totalIncomeAmount,
    totalExpenseAmount
  );

  const response = data.map((insightData) => {
    switch (insightData.insightType) {
      case insightType.incomeToExpenseRatio:
        return {
          insightType: "Income To Expense Ratio",
          insights: [
            `For every dollar you earn, you spend $${insightData.insight.incomeToExpenseRatio}`,
          ],
          subData: [
            {
              key: "incomeToExpenseRatio",
              value: insightData.insight.incomeToExpenseRatio,
            },
          ],
        };
      case insightType.savingGoalProgress:
        switch (insightData.insight.goalStatus) {
          case "achieved":
            return {
              insightType: "Saving Goal Progress",
              insights: [
                "You have successfully achieved your saving goal for this month",
              ],
              subData: [
                {
                  key: "progressPercentage",
                  value: insightData.insight.progressPercentage,
                },
              ],
            };
          case "surpassed":
            return {
              insightType: "Saving Goal Progress",
              insights: [
                `You have successfully achieved and surpassed your saving goal for this month by $${insightData.insight.surpassedAmount}`,
              ],
              subData: [
                {
                  key: "progressPercentage",
                  value: insightData.insight.progressPercentage,
                },
                {
                  key: "surpassedAmount",
                  surpassedAmount: insightData.insight.surpassedAmount,
                },
              ],
            };
          case "regressing":
            return {
              insightType: insightType.savingGoalProgress,
              insights: [
                `You have been regressing. You have overspent $${insightData.insight.overspentAmount}`,
              ],
              subData: [
                {
                  key: "progressPercentage",
                  value: insightData.insight.progressPercentage,
                },
                {
                  key: "overspentAmount",
                  value: insightData.insight.overspentAmount,
                },
                {
                  key: "amountNeededToHitSavingGoal",
                  value: insightData.insight.amountNeededToHitSavingGoal,
                },
              ],
            };
          case "noProgress":
            return {
              insightType: insightType.savingGoalProgress,
              insights: [
                `You have made zero progress towards saving goal. Your expenses is equal to your income.`,
              ],
              subData: [
                {
                  key: "progressPercentage",
                  value: insightData.insight.progressPercentage,
                },
                {
                  key: "amountNeededToHitSavingGoal",
                  value: insightData.insight.amountNeededToHitSavingGoal,
                },
              ],
            };
        }

      case insightType.spendingLeakDetector:
        return {
          insightType: "Spending Leak Detector",
          insights: [
            insightData.insight.map((data) => {
              if (data.isFixed) {
                return `Fixed Category: ${data.expenseCategory} made up ${data.expensePercentage}% of your expenses this month, which equates to $${data.expenseAmount}`;
              } else {
                return `Non-Fixed Category: ${data.expenseCategory} made up ${data.expensePercentage}% of your expenses this month, which equates to $${data.expenseAmount}`;
              }
            }),
          ],
          subData: [
            insightData.insight.map((data) => {
              if (data.isFixed) {
                return {
                  key: data.expenseCategory,
                  value: data.expensePercentage,
                };
              } else {
                return {
                  key: data.expenseCategory,
                  value: data.expensePercentage,
                };
              }
            }),
          ],
        };

      case insightType.fixedToVariableExpenseRatio:
        return {
          insightType: "Fixed To Variable Expense Ratio",
          insights: (() => {
            if (
              insightData.insight.fixedExpensePercentage >
              insightData.insight.nonFixedExpensePercentage
            ) {
              return [
                `You have ${insightData.insight.fixedExpensePercentage} Fixed Expenses - Hard to reduce`,
                `You have ${insightData.insight.nonFixedExpensePercentage} Variable Expenses - your reduction options are limited`,
              ];
            } else if (
              insightData.insight.fixedExpensePercentage <
              insightData.insight.nonFixedExpensePercentage
            ) {
              return [
                `You have ${insightData.insight.fixedExpensePercentage} Fixed Expenses - You have more flexibility to reduce costs.`,
                `You have ${insightData.insight.nonFixedExpensePercentage} Variable Expenses - you have plenty of room to adjust your spending.`,
              ];
            } else {
              return [
                `Your expenses are evenly split between fixed and variable categories.`,
                `You have a balanced spending profile — half of your costs are essential, and half are adjustable.`,
              ];
            }
          })(),
          subData: [
            { key: "fixed", value: insightData.insight.fixedExpensePercentage },
            {
              key: "variable",
              value: insightData.insight.nonFixedExpensePercentage,
            },
          ],
        };
      case insightType.paretoStats:
        return {
          insightType: "Pareto Stats",
          insights: `${
            insightData.insight.paretoPercentage
          }% of categories (${insightData.insight.categoriesResponsible.join(
            ", "
          )}) account for 80% of your expenses — your strongest optimization targets.`,
          subData: [
            {
              key: "categoriesResponsible",
              value: insightData.insight.categoriesResponsible,
            },
          ],
        };
    }
  });

  res.status(200).json({ success: true, data: response });
};

export default insightController;
