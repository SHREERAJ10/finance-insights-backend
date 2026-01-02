import getExpenseCategory from "../../service/expense/getExpenseCategory.js";

const getExpenseCategoryController = async (req, res) => {
    try {
        const userId = req.uid;
        const expenseCategories = await getExpenseCategory(userId);
        res.status(200).json({ 'success': true, 'data': expenseCategories });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'success': false, 'error': 'internal server error!' });
    }
}

export default getExpenseCategoryController;