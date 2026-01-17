import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import addSavingGoalController from '../controller/savingGoalController/addSavingGoalController.js';
import updateSavingGoalController from '../controller/savingGoalController/updateSavingGoalController.js';
import deleteSavingGoalController from '../controller/savingGoalController/deleteSavingGoalController.js';
import getSavingGoalController from '../controller/savingGoalController/getSavingGoalController.js';

const savingRoute = express.Router();

savingRoute.post('/',verifyToken, addSavingGoalController);
savingRoute.put('/:id',verifyToken,updateSavingGoalController);
savingRoute.get('/',verifyToken,getSavingGoalController);
savingRoute.delete('/:id', verifyToken, deleteSavingGoalController);

export default savingRoute;