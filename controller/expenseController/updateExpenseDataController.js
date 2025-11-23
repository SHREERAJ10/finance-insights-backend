import {expenseDataSchema} from '../../models/expenseModel.js';
import updateExpenseData from '../../service/expense/updateExpenseData.js';

const updateExpenseDataController = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const parsedData = await expenseDataSchema.parseAsync(req.body);
        const { expenseCategoryId, expenseAmount, expenseDescription } = parsedData;
        await updateExpenseData(expenseId, expenseCategoryId, expenseAmount, expenseDescription);
        res.status(200).json({ 'success': true, 'message': 'expense data updated successfully!' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'success': false, 'error': 'internal server error!' });
    }
}

export default updateExpenseDataController;