import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './config/app-data-source';

import blogPostRouter from './routes/BlogPostRoutes';
import planRouter from './routes/PlanRoutes';
import workoutPlanRouter from './routes/WorkoutPlanRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.use('/blogposts', blogPostRouter);
app.use('/plans', planRouter);
app.use('/workout-plans', workoutPlanRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

AppDataSource.initialize()
  .then(() => {
    console.log('Plan-blog-service DB connected');
    app.listen(PORT, () => {
      console.log(`Plan-blog-service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });