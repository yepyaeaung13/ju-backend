import dotenv from 'dotenv';
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

export const ENV = {
  HOST: process.env.HOST || '127.0.0.1',
  SWAGGER_HOST: process.env.SWAGGER_HOST,
  PORT: process.env.PORT || '3000',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '5432',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASS: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || 'test',
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: process.env.REDIS_PORT || '6379',
  REDIS_PASS: process.env.REDIS_PASS || '',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
};
