import { ZodError } from "zod";
import incomeDataSchema from "../../models/incomeDataModel.js";
import addIncomeData from "../../service/income/addIncomeData.js";

const addIncomeDataController = async (req, res) => {
  try {
    const userId = req.uid;
    const parsedIncomeData = await incomeDataSchema.parseAsync(req.body);
    const { incomeAmount, incomeSourceId } = parsedIncomeData;
    const addIncome = await addIncomeData(userId, incomeAmount, incomeSourceId);
    res
      .status(200)
      .json({ success: true, message: "Income data added successfully!" });
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

export default addIncomeDataController;
