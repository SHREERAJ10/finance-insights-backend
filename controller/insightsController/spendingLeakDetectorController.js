import spendingLeakDetector from "../../service/insights/spendingLeakDetector.js";

const spendingLeakDetectorController = async (req, res)=>{
    const expenseData = req.expenseData;
    const totalExpenseAmount = req.totalExpenseAmount;
    const expenseDataByCategory = await spendingLeakDetector( expenseData, totalExpenseAmount);
    res.status(200).json({'success':true,'data':expenseDataByCategory});
}

export default spendingLeakDetectorController;