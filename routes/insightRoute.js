import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import incomeToExpenseRatioController from '../controller/insightsController/incomeToExpenseRatioController.js';

const insightRoute = express.Router();

insightRoute.get('/incomeToExpenseRatio', verifyToken, incomeToExpenseRatioController);

export default insightRoute;