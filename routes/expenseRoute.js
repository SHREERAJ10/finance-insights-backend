import express from 'express';
import verifyToken from '../middleware/verifyToken.js'
import addExpenseDataController from '../controller/expenseController/addExpenseDataController.js';
import addExpenseCategoryController from '../controller/expenseController/addExpenseCategoryController.js';
import updateExpenseDataController from '../controller/expenseController/updateExpenseDataController.js';
import updateExpenseCategoryController from '../controller/expenseController/updateExpenseCategoryController.js';
import deleteExpenseDataController from '../controller/expenseController/deleteExpenseDataController.js';
import getExpenseCategoryController from '../controller/expenseController/getExpenseCategoryController.js';

const expenseRoute = express.Router();

expenseRoute.post('/data',verifyToken, addExpenseDataController);
expenseRoute.put('/data/:id',verifyToken, updateExpenseDataController);
expenseRoute.post('/category', verifyToken, addExpenseCategoryController);
expenseRoute.get('/category', verifyToken, getExpenseCategoryController);
expenseRoute.put('/category/:id', verifyToken, updateExpenseCategoryController);
expenseRoute.delete('/data/:id', verifyToken, deleteExpenseDataController)

export default expenseRoute;