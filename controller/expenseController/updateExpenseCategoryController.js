import updateExpenseCategory from "../../service/expense/updateExpenseCategory.js";
import { expenseCategorySchema } from "../../models/expenseModel.js";
import { ZodError } from "zod";

const updateExpenseCategoryController = async (req, res) => {
  try {
    const expenseCategoryId = req.params.id;
    const parsedData = await expenseCategorySchema.parseAsync(req.body);
    const { expenseCategory, isFixed } = parsedData;
    await updateExpenseCategory(expenseCategoryId, expenseCategory, isFixed);
    res
      .status(200)
      .json({
        success: true,
        message: "Expense category updated successfully!",
      });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(422).json({
        success: false,
        error: "Invalid data format!",
      });
    } else {
      console.log(err);
      res.status(500).json({ success: false, error: "internal server error!" });
    }
  }
};

export default updateExpenseCategoryController;
