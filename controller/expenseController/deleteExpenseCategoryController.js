import deleteExpenseCategory from "../../service/expense/deleteExpenseCategory.js";

const deleteExpenseCategoryController = async (req, res)=>{
    try{
        const expenseCategoryId = req.params.id;
        await deleteExpenseCategory(expenseCategoryId);
        res.status(200).json({'success':true,'message':'Expense category deleted successfully!'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default deleteExpenseCategoryController;