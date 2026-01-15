import { ZodError } from "zod";
import { savingGoalSchema } from "../../models/savingGoalModel.js";
import addSavingGoal from "../../service/saving/addSavingGoal.js";

const addSavingGoalController = async (req, res) => {
  try {
    const userId = req.uid;
    const parsedData = await savingGoalSchema.parseAsync(req.body);
    const { savingGoalAmount } = parsedData;
    await addSavingGoal(userId, savingGoalAmount);
    res
      .status(200)
      .json({ success: true, message: "saving goal added successfully!" });
  } catch (err) {
    if (err.code == "P2002") {
      res.status(409).json({
        success: false,
        error: "Saving Goal already added for this month!",
      });
    } else if (err instanceof ZodError) {
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

export default addSavingGoalController;
