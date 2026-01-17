import { ZodError } from "zod";
import getSavingGoal from "../../service/saving/getSavingGoal.js";
import { getYearAndMonth } from "../../service/saving/addSavingGoal.js";

const getSavingGoalController = async (req, res) => {
  try {
    const userId = req.uid;
    const currDate = getYearAndMonth();
    let savingGoalData = await getSavingGoal(userId, currDate);
    res
      .status(200)
      .json({ success: true, data:savingGoalData });
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

export default getSavingGoalController;
