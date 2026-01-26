import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import userRouter from './routers/userRouter';
import refreshTokenRouter from './routers/refreshTokenRouter';
import orderRouter from './routers/orderRouter';
import stripeRouter from './routers/stripe';
import { refreshTokenLimiter } from './controllers/refreshTokenLimiter';
import healthCheckRouter from './routers/healthRouter'
dotenv.config();

const app = express();


app.use(cors({
  origin: ['http://frontend.voguenest.com'],
  credentials: true
}));


app.use(compression());
app.use(cookieParser());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', userRouter);
app.use('/api', orderRouter);
app.use('/api/payment', stripeRouter);
app.use('/api', refreshTokenLimiter, refreshTokenRouter);
app.use('/api', healthCheckRouter);

app.set('trust proxy', true);
const APIPORT = process.env.APIPORT;  

app.listen(APIPORT, () => {
  console.log(`Server running on http://0.0.0.0:${APIPORT}/`);
});


const mongoUser = process.env.MONGO_USER;
const mongoPass = encodeURIComponent(process.env.MONGO_PASS || "");
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const dbName = process.env.DB_NAME;

const mongoURI = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${dbName}?authSource=admin`;


if (!mongoURI) {
  throw new Error('MONGODB_URL is not defined');
}


mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.error(error.stack);
    process.exit(1);  
  });
