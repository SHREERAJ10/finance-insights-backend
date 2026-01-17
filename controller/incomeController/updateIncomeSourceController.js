import { ZodError } from "zod";
import { incomeSourceSchema } from "../../models/incomeDataModel.js";
import updateIncomeSource from "../../service/income/updateIncomeSource.js";

const updateIncomeSourceController = async (req, res) => {
  try {
    const incomeSourceId = req.params.id;
    const parsedUpdatedData = await incomeSourceSchema.parseAsync(req.body);
    const { incomeSource, isFixed } = parsedUpdatedData;
    await updateIncomeSource(incomeSourceId, incomeSource, isFixed);
    res
      .status(200)
      .json({ success: true, message: "Income source updated successfully!" });
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

export default updateIncomeSourceController;
