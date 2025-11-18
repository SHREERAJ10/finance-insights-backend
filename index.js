import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/user',userRoute);

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});