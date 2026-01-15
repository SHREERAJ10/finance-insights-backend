import { ZodError } from "zod";
import incomeDataSchema from "../../models/incomeDataModel.js";
import updateIncomeData from "../../service/income/updateIncomeData.js";

const updateIncomeDataController = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const parsedUpdatedData = await incomeDataSchema.parseAsync(req.body);
    const { incomeAmount, incomeSourceId } = parsedUpdatedData;
    await updateIncomeData(incomeId, incomeAmount, incomeSourceId);
    res
      .status(200)
      .json({ success: true, message: "Income data updated successfully!" });
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

export default updateIncomeDataController;
