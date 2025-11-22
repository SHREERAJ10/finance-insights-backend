import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import addIncomeDataController from '../controller/addIncomeDataController.js';
import addIncomeSourceController from '../controller/addIncomeSourceController.js';
import updateIncomeDataController from '../controller/updateIncomeDataController.js';
import updateIncomeSourceController from '../controller/updateIncomeSourceController.js';
import deleteIncomeDataController from '../controller/deleteIncomeDataController.js';

const incomeRoute = express.Router();

incomeRoute.post('/data',verifyToken, addIncomeDataController);
incomeRoute.put('/data/:id',verifyToken, updateIncomeDataController);
incomeRoute.post('/source',verifyToken, addIncomeSourceController);
incomeRoute.put('/source/:id', verifyToken, updateIncomeSourceController);
incomeRoute.delete('/data/:id',verifyToken, deleteIncomeDataController);

export default incomeRoute;