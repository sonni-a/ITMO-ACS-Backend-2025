import express from 'express';
import userRouter from './routes/UserRoutes';
import workoutRouter from './routes/WorkoutRoutes';
import planRouter from './routes/PlanRoutes';
import workoutPlanRouter from './routes/WorkoutPlanRoutes';
import userProgressRouter from './routes/UserProgressRoutes';
import blogPostRouter from './routes/BlogPostRoutes';
import categoryRouter from './routes/CategoryRoutes';
import workoutCategoryRouter from './routes/WorkoutCategoryRoutes';

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/workouts', workoutRouter);
app.use('/plans', planRouter);
app.use('/workout-plans', workoutPlanRouter);
app.use('/user-progress', userProgressRouter);
app.use('/blog-posts', blogPostRouter);
app.use('/categories', categoryRouter);
app.use('/workout-categories', workoutCategoryRouter);

export default app;