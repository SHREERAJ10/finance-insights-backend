import spendingLeakDetector from "../../service/insights/spendingLeakDetector.js";

const spendingLeakDetectorController = async (req, res)=>{
    const userId = req.uid;
    const expenseData = req.expenseData;
    const totalExpenseAmount = req.totalExpenseAmount;
    const expenseDataByCategory = await spendingLeakDetector(userId, expenseData, totalExpenseAmount);
    res.status(200).json({'success':true,'data':expenseDataByCategory});
}

export default spendingLeakDetectorController;