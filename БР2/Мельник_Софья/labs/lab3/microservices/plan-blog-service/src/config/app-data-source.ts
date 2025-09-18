import { DataSource } from 'typeorm';
import { BlogPost } from '../entities/BlogPost';
import { Plan } from '../entities/Plan';
import { WorkoutPlan } from '../entities/WorkoutPlan';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',          
    password: 'mysql', 
    database: 'plan_blog_db',
    synchronize: true,
    logging: false,
    entities: [BlogPost, Plan, WorkoutPlan],
});