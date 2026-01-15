import deleteIncomeSource from "../../service/income/deleteIncomeSource.js";

const deleteIncomeSourceController = async (req, res)=>{
    try{
        const incomeSourceId = req.params.id;
        await deleteIncomeSource(incomeSourceId);
        res.status(200).json({'success':true,'message':'Income source deleted successfully!'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default deleteIncomeSourceController;