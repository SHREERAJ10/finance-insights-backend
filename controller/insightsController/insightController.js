import insightOrchestrator from "../../orchestrator/insightOrchestrator.js";

export const formattedCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const insightController = async (req, res) => {
  try {
    const {
      id,
      incomeData,
      expenseData,
      totalIncomeAmount,
      totalExpenseAmount,
    } = req;

    if (incomeData.length != 0 && expenseData.length != 0) {
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
                `For every dollar you earn, you spend <b>${formattedCurrency(
                  insightData.insight.incomeToExpenseRatio
                )}</b>.`,
              ],
              subData: [
                {
                  key: "Income To Expense Ratio",
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
                    "You have successfully achieved your saving goal for this month.",
                  ],
                  subData: [
                    {
                      key: "Progress Percentage",
                      value: `${insightData.insight.progressPercentage}%`,
                    },
                  ],
                };
              case "surpassed":
                return {
                  insightType: "Saving Goal Progress",
                  insights: [
                    `You have successfully achieved and surpassed your saving goal for this month by ${formattedCurrency(
                      insightData.insight.surpassedAmount
                    )}.`,
                  ],
                  subData: [
                    {
                      key: "Progress Percentage",
                      value: `${insightData.insight.progressPercentage}%`,
                    },
                    {
                      key: "Surpassed Amount",
                      value: `${formattedCurrency(
                        insightData.insight.surpassedAmount
                      )}`,
                    },
                  ],
                };
              case "regressing":
                return {
                  insightType: "Saving Goal Progresss",
                  insights: [
                    `You have been regressing. You have overspent ${formattedCurrency(
                      insightData.insight.overspentAmount
                    )}.`,
                  ],
                  subData: [
                    {
                      key: "Progress Percentage",
                      value: `${insightData.insight.progressPercentage}%`,
                    },
                    {
                      key: "Overspent Amount",
                      value: `${formattedCurrency(
                        insightData.insight.overspentAmount
                      )}`,
                    },
                    {
                      key: "Amount Needed To Hit Saving Goal",
                      value: `${formattedCurrency(
                        insightData.insight.amountNeededToHitSavingGoal
                      )}`,
                    },
                  ],
                };
              case "noProgress":
                return {
                  insightType: "Saving Goal Progress",
                  insights: [
                    `You have made zero progress towards saving goal. Your expenses is equal to your income.`,
                  ],
                  subData: [
                    {
                      key: "Progress Percentage",
                      value: `${insightData.insight.progressPercentage}%`,
                    },
                    {
                      key: "Amount Needed To Hit Saving Goal",
                      value: `${formattedCurrency(
                        insightData.insight.amountNeededToHitSavingGoal
                      )}`,
                    },
                  ],
                };
            }

          case insightType.spendingLeakDetector:
            return {
              insightType: "Spending Leak Detector",
              insights: insightData.insight.map((data) => {
                if (data.isFixed) {
                  return `<b>Fixed Category:</b> ${
                    data.expenseCategory
                  } made up ${
                    data.expensePercentage
                  }% of your expenses this month, which equates to ${formattedCurrency(
                    data.expenseAmount
                  )}.`;
                } else {
                  return `<b>Non-Fixed Category:</b> ${
                    data.expenseCategory
                  } made up ${
                    data.expensePercentage
                  }% of your expenses this month, which equates to ${formattedCurrency(
                    data.expenseAmount
                  )}.`;
                }
              }),
              subData: insightData.insight.map((data) => {
                return {
                  key: data.expenseCategory,
                  value: `${data.expensePercentage}%`,
                };
              }),
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
                    `You have ${insightData.insight.fixedExpensePercentage}% Fixed Expenses - Hard to reduce.`,
                    `You have ${insightData.insight.nonFixedExpensePercentage}% Variable Expenses - your reduction options are limited.`,
                  ];
                } else if (
                  insightData.insight.fixedExpensePercentage <
                  insightData.insight.nonFixedExpensePercentage
                ) {
                  return [
                    `You have ${insightData.insight.fixedExpensePercentage}% Fixed Expenses - You have more flexibility to reduce costs.`,
                    `You have ${insightData.insight.nonFixedExpensePercentage}% Variable Expenses - you have plenty of room to adjust your spending.`,
                  ];
                } else {
                  return [
                    `Your expenses are evenly split between fixed and variable categories.`,
                    `You have a balanced spending profile - half of your costs are essential, and half are adjustable.`,
                  ];
                }
              })(),
              subData: [
                {
                  key: "Fixed Expense",
                  value: `${insightData.insight.fixedExpensePercentage}%`,
                },
                {
                  key: "Variable Expense",
                  value: `${insightData.insight.nonFixedExpensePercentage}%`,
                },
              ],
            };
          case insightType.paretoStats:
            return {
              insightType: "Pareto Stats",
              insights: [
                `${
                  insightData.insight.paretoPercentage
                }% of categories (<i>${insightData.insight.categoriesResponsible.join(
                  ", "
                )}</i>) account for 80% of your expenses - your strongest optimization targets.`,
              ],
              subData: [
                {
                  key: "Categories Responsible",
                  value: `${insightData.insight.categoriesResponsible.join(
                    ", "
                  )}`,
                },
              ],
            };
        }
      });

      res.status(200).json({ success: true, data: response });
    }
    else{
      res.status(200).json({success:true, data: [], message:"Not Enough Data For Insights. Add Data to get Started."});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

export default insightController;
