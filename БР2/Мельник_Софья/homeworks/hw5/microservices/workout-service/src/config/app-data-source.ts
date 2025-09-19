import { DataSource } from 'typeorm';
import { Workout } from '../entities/Workout';
import { Category } from '../entities/Category';
import { WorkoutCategory } from '../entities/WorkoutCategory';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,  
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Workout, Category, WorkoutCategory],
});