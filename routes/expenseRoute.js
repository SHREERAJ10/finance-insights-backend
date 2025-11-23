import express from 'express';
import verifyToken from '../middleware/verifyToken.js'
import addExpenseDataController from '../controller/expenseController/addExpenseDataController.js';
import addExpenseCategoryController from '../controller/expenseController/addExpenseCategoryController.js';
import updateExpenseDataController from '../controller/expenseController/updateExpenseDataController.js';

const expenseRoute = express.Router();

expenseRoute.post('/data',verifyToken, addExpenseDataController);
expenseRoute.put('/data/:id',verifyToken, updateExpenseDataController);
expenseRoute.post('/category', verifyToken, addExpenseCategoryController);

export default expenseRoute;