import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js'
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config({});

const app=express();

const _dirname=path.resolve();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions={
    origin: 'https://job-portal-xjru.onrender.com',
    credentials: true
}

app.use(cors(corsOptions));

//api's
app.use('/api/v1/user',userRouter);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/application',applicationRoute);
app.use(express.static(path.join(_dirname,'frontend/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,'frontend','dist','index.html'));
})

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on port ${PORT}`);
})