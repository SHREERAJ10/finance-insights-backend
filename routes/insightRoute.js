import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import incomeToExpenseRatioController from '../controller/insightsController/incomeToExpenseRatioController.js';
import savingGoalProgressController from '../controller/insightsController/savingGoalProgressController.js';

const insightRoute = express.Router();

insightRoute.get('/incomeToExpenseRatio', verifyToken, incomeToExpenseRatioController);
insightRoute.get('/savingGoalProgress', verifyToken, savingGoalProgressController);

export default insightRoute;