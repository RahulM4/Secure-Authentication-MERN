// console.log('Greetings from  Backend server');

import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from './app.js';

//env variables config
dotenv.config()

//connect baked server to mongodb database
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Backend Server Connected to MongoDB Database');
}).catch((err)=>{
    console.log(err);
})

//Port 
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Bakend Server is running on port ${port}`);
})

