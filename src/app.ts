import express from 'express';
import bodyParser from 'body-parser';
import urlRoutes from './routes/urlRoutes';
import mongoose, { ConnectOptions } from 'mongoose';
import { createClient } from 'redis';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

mongoose.connect(process.env.MONGODB_URI !);

redisClient.on('error', (err) => {
  console.error(`Error connecting to Redis: ${err}`);
});

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS !),
  max: parseInt(process.env.RATE_LIMIT_MAX !),
});

app.use(bodyParser.json());
app.use('/api', urlRoutes);
app.use(limiter);

export default app;
export { redisClient };