import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import addIncomeDataController from '../controller/addIncomeDataController.js';
import addIncomeSourceController from '../controller/addIncomeSourceController.js';
import updateIncomeDataController from '../controller/updateIncomeDataController.js';

const incomeRoute = express.Router();

incomeRoute.post('/data',verifyToken, addIncomeDataController);
incomeRoute.put('/data/:id',verifyToken, updateIncomeDataController);
incomeRoute.post('/source',verifyToken, addIncomeSourceController);

export default incomeRoute;