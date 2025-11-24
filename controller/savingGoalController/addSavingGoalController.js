import { savingGoalSchema } from "../../models/savingGoalModel.js";
import addSavingGoal from "../../service/saving/addSavingGoal.js";

const addSavingGoalController = async (req, res)=>{
    try{
        const userId = req.uid;
        const parsedData = await savingGoalSchema.parseAsync(req.body);
        const {savingGoalAmount} = parsedData;
        await addSavingGoal(userId, savingGoalAmount);
        res.status(200).json({ 'success': true, 'message': 'saving goal added successfully!' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'success': false, 'error': 'internal server error!' });
    }
}

export default addSavingGoalController;