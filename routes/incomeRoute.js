import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import addIncomeDataController from '../controller/incomeController/addIncomeDataController.js';
import addIncomeSourceController from '../controller/incomeController/addIncomeSourceController.js';
import updateIncomeDataController from '../controller/incomeController/updateIncomeDataController.js';
import updateIncomeSourceController from '../controller/incomeController/updateIncomeSourceController.js';
import deleteIncomeDataController from '../controller/incomeController/deleteIncomeDataController.js';
import getIncomeSourceController from '../controller/incomeController/getIncomeSourceController.js';

const incomeRoute = express.Router();

incomeRoute.post('/data',verifyToken, addIncomeDataController);
incomeRoute.put('/data/:id',verifyToken, updateIncomeDataController);
incomeRoute.post('/source',verifyToken, addIncomeSourceController);
incomeRoute.get('/source',verifyToken, getIncomeSourceController);
incomeRoute.put('/source/:id', verifyToken, updateIncomeSourceController);
incomeRoute.delete('/data/:id',verifyToken, deleteIncomeDataController);

export default incomeRoute;