import deleteSavingGoal from "../../service/saving/deleteSavingGoal.js";

const deleteSavingGoalController = async (req, res)=>{
    try{
    const savingGoalId = req.params.id;
    await deleteSavingGoal(savingGoalId);
    res.status(200).json({ 'success': true, 'message': 'saving goal deleted successfully!' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'success': false, 'error': 'internal server error!' });
    }
}

export default deleteSavingGoalController;