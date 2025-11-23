import express from 'express';
import verifyToken from '../middleware/verifyToken.js'
import addExpenseDataController from '../controller/expenseController/addExpenseDataController.js';

const expenseRoute = express.Router();

expenseRoute.post('/data',verifyToken, addExpenseDataController);

export default expenseRoute;