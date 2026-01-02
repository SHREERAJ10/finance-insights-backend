import getIncomeSource from "../../service/income/getIncomeSource.js";

const getIncomeSourceController = async (req, res)=>{
    try{
        const userId = req.uid;
        const incomeSources = await getIncomeSource(userId);
        res.status(200).json({'success':true, 'data':incomeSources});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default getIncomeSourceController;