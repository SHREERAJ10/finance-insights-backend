import { expenseCategorySchema } from "../../models/expenseModel.js";
import addExpenseCategory from "../../service/expense/addExpenseCategory.js";

const addExpenseCategoryController = async (req, res)=>{
    try{
        const userId = req.uid;
        const parsedData = await expenseCategorySchema.parseAsync(req.body);
        const {expenseCategory, isFixed} = parsedData;
        await addExpenseCategory(userId, expenseCategory, isFixed);
        res.status(200).json({'success':true,'message':'expense category added successfully!'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default addExpenseCategoryController;