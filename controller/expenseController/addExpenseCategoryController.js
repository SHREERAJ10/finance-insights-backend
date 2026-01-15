import { ZodError } from "zod";
import { expenseCategorySchema } from "../../models/expenseModel.js";
import addExpenseCategory from "../../service/expense/addExpenseCategory.js";

const addExpenseCategoryController = async (req, res) => {
  try {
    const userId = req.uid;
    const parsedData = await expenseCategorySchema.parseAsync(req.body);
    const { expenseCategory, isFixed } = parsedData;
    await addExpenseCategory(userId, expenseCategory, isFixed);
    res
      .status(200)
      .json({ success: true, message: "Expense Category added successfully!" });
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

export default addExpenseCategoryController;
