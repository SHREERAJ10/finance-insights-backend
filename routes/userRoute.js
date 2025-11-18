import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import registerUserController from '../controller/registerUserController.js';

const userRoute = express.Router();

userRoute.post('/init',verifyToken, registerUserController);

export default userRoute;