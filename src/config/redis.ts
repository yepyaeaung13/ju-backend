import Redis from 'ioredis';
import dotenv from 'dotenv';
import { ENV } from './env';
dotenv.config();

const redis = new Redis({
  host: ENV.REDIS_HOST,
  port: Number(ENV.REDIS_PORT),
  password: ENV.REDIS_PASS,
});

export default redis;
