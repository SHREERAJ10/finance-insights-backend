import { ZodError } from "zod";
import { incomeSourceSchema } from "../../models/incomeDataModel.js";
import addIncomeSource from "../../service/income/addIncomeSource.js";

const addIncomeSourceController = async (req, res) => {
  try {
    const userId = req.uid;
    const parsedIncomeSourceData = await incomeSourceSchema.parseAsync(
      req.body
    );
    const { incomeSource, isFixed } = parsedIncomeSourceData;
    await addIncomeSource(userId, incomeSource, isFixed);
    res
      .status(200)
      .json({ success: true, message: "Income source added successfully!" });
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

export default addIncomeSourceController;
