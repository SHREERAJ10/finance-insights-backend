import express from 'express';
import verifyToken from '../middleware/verifyToken.js'
import addExpenseDataController from '../controller/expenseController/addExpenseDataController.js';
import addExpenseCategoryController from '../controller/expenseController/addExpenseCategoryController.js';
import updateExpenseDataController from '../controller/expenseController/updateExpenseDataController.js';
import updateExpenseCategoryController from '../controller/expenseController/updateExpenseCategoryController.js';
import deleteExpenseDataController from '../controller/expenseController/deleteExpenseDataController.js';
import getExpenseCategoryController from '../controller/expenseController/getExpenseCategoryController.js';
import getExpenseDataController from '../controller/expenseController/getExpenseDataController.js';
import deleteExpenseCategoryController from '../controller/expenseController/deleteExpenseCategoryController.js';

const expenseRoute = express.Router();

expenseRoute.post('/data',verifyToken, addExpenseDataController);
expenseRoute.put('/data/:id',verifyToken, updateExpenseDataController);
expenseRoute.post('/category', verifyToken, addExpenseCategoryController);
expenseRoute.get('/category', verifyToken, getExpenseCategoryController);
expenseRoute.put('/category/:id', verifyToken, updateExpenseCategoryController);
expenseRoute.delete('/category/:id', verifyToken, deleteExpenseCategoryController);
expenseRoute.delete('/data/:id', verifyToken, deleteExpenseDataController);
expenseRoute.get('/data', verifyToken, getExpenseDataController);

export default expenseRoute;