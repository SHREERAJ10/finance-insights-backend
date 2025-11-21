import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import addIncomeDataController from '../controller/addIncomeDataController.js';

const incomeRoute = express.Router();

incomeRoute.post('/data',verifyToken, addIncomeDataController);

export default incomeRoute;