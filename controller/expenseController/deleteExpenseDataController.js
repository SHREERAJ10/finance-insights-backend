import deleteExpenseData from "../../service/expense/deleteExpenseData.js";

const deleteExpenseDataController = async (req, res)=>{
    try{
        const expenseId = req.params.id;
        await deleteExpenseData(expenseId);
        res.status(200).json({'success':true,'message':'expense data deleted successfully!'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default deleteExpenseDataController;