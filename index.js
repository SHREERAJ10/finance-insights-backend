import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import incomeRoute from './routes/incomeRoute.js';
import expenseRoute from './routes/expenseRoute.js';
import savingRoute from './routes/savingRoute.js';
import insightRoute from './routes/insightRoute.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://fynsight.vercel.app/"
}))

app.use('/user',userRoute);
app.use('/income', incomeRoute);
app.use('/expense', expenseRoute);
app.use('/saving',savingRoute);
app.use('/insight', insightRoute);

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});