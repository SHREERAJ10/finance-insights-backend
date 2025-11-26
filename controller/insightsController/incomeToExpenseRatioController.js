import incomeToExpenseRatio from "../../service/insights/incomeToExpenseRatio.js";

const incomeToExpenseRatioController = async (req, res)=>{
    try{
        const userId = req.uid;
        const ratio = await incomeToExpenseRatio(userId);
        res.status(200).json({'success':true, 'incomeToExpenseRatio':ratio, 'insight':`For every dollar you earn, you spend $${ratio}` });
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default incomeToExpenseRatioController;