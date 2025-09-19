import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { ENV } from './env';
import { SwaggerUser } from '../modules/user/swagger-user.entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  entities: [User, SwaggerUser],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
});
