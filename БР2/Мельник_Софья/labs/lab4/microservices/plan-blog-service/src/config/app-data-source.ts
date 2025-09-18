import { DataSource } from 'typeorm';
import { BlogPost } from '../entities/BlogPost';
import { Plan } from '../entities/Plan';
import { WorkoutPlan } from '../entities/WorkoutPlan';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [BlogPost, Plan, WorkoutPlan],
});