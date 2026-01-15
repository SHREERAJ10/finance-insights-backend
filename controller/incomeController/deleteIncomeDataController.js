import deleteIncomeData from "../../service/income/deleteIncomeData.js";

const deleteIncomeDataController = async (req, res)=>{
    try{
        const incomeId = req.params.id;
        await deleteIncomeData(incomeId);
        res.status(200).json({'success':true,'message':'Income data deleted successfully!'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default deleteIncomeDataController;