import { ZodError } from "zod";
import { expenseDataSchema } from "../../models/expenseModel.js";
import addExpenseData from "../../service/expense/addExpenseData.js";

const addExpenseDataController = async (req, res) => {
  try {
    const userId = req.uid;
    const parsedData = await expenseDataSchema.parseAsync(req.body);
    const { expenseAmount, expenseDescription, expenseCategoryId } = parsedData;
    await addExpenseData(
      userId,
      expenseAmount,
      expenseDescription,
      expenseCategoryId
    );
    res
      .status(200)
      .json({ "success": true, "message": "Expense data added successfully" });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(422).json({
        "success": false,
        "error": "Invalid data format!",
      });
    } else {
      console.log(err);
      res.status(500).json({ "success": false, "error": "internal server error!" });
    }
  }
};

export default addExpenseDataController;
