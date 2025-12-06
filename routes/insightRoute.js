import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import incomeToExpenseRatioController from '../controller/insightsController/incomeToExpenseRatioController.js';
import savingGoalProgressController from '../controller/insightsController/savingGoalProgressController.js';
import spendingLeakDetectorController from '../controller/insightsController/spendingLeakDetectorController.js';
import getInsightsData from '../middleware/getInsightsData.js';

const insightRoute = express.Router();

insightRoute.get('/incomeToExpenseRatio', verifyToken, getInsightsData, incomeToExpenseRatioController);
insightRoute.get('/savingGoalProgress', verifyToken, getInsightsData ,savingGoalProgressController);
insightRoute.get('/spendingLeakDetector', verifyToken, getInsightsData, spendingLeakDetectorController);
insightRoute.get('/test',verifyToken, getInsightsData);

export default insightRoute;