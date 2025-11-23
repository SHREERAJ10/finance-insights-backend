import updateExpenseCategory from "../../service/expense/updateExpenseCategory.js";
import {expenseCategorySchema} from '../../models/expenseModel.js'

const updateExpenseCategoryController = async (req, res)=>{
    try{
        const expenseCategoryId = req.params.id;
        const parsedData = await expenseCategorySchema.parseAsync(req.body);
        const {expenseCategory, isFixed} = parsedData;
        await updateExpenseCategory(expenseCategoryId, expenseCategory, isFixed);
        res.status(200).json({'success':true, 'message':'expense category updated successfully!'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default updateExpenseCategoryController;