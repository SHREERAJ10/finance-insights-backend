import incomeDataSchema from "../../models/incomeDataModel.js";
import addIncomeData from "../../service/income/addIncomeData.js";

const addIncomeDataController = async (req, res)=>{
    try{
        const userId = req.uid;
        const parsedIncomeData = await incomeDataSchema.parseAsync(req.body);
        const {incomeAmount, incomeSourceId} = parsedIncomeData;
        const addIncome = await addIncomeData(userId, incomeAmount, incomeSourceId);
        res.status(200).json({'success':true,'message':'income data added successfully!'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default addIncomeDataController;