import { savingGoalSchema } from "../../models/savingGoalModel.js";
import updateSavingGoal from "../../service/saving/updateSavingGoal.js";

const updateSavingGoalController = async (req, res)=>{
    try{
    const savingGoalId = req.params.id;
    const parsedData = await savingGoalSchema.parseAsync(req.body);
    const {savingGoalAmount} = parsedData;
    await updateSavingGoal(savingGoalId, savingGoalAmount);
    res.status(200).json({ 'success': true, 'message': 'saving goal updated successfully!' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'success': false, 'error': 'internal server error!' });
    }
}

export default updateSavingGoalController;