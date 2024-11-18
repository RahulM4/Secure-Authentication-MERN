import express from 'express';
import cors from 'cors';    
import cookieParser from 'cookie-parser';
import globalErrorHandler from './controller/errorController.js';
import userRouter from './routes/userRouters.js';
import AppError from './utils/appError.js';


//craete express app
const app = express();

//middlewares 
app.use(cookieParser());

//cross origin resource sharing allows us to make requests from our frontend to our backend
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ['GET', 'POST'],
}))

app.use(express.json({limit : '10kb'}));    

//user routes 
app.use('/api/v1/users', userRouter);

//Error Handler
app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})


//Error Handler
app.use(globalErrorHandler);

//export app
export default app;