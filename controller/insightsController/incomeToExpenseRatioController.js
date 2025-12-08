import incomeToExpenseRatio from "../../service/insights/incomeToExpenseRatio.js";

const incomeToExpenseRatioController = async (req, res, next)=>{
    try{
        const totalIncomeAmount = req.totalIncomeAmount;
        const totalExpenseAmount = req.totalExpenseAmount;
        const ratio = await incomeToExpenseRatio(totalIncomeAmount, totalExpenseAmount);
        next();
        res.status(200).json({'success':true, 'incomeToExpenseRatio':ratio, 'insight':`For every dollar you earn, you spend $${ratio}` });
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default incomeToExpenseRatioController;