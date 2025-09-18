import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './config/app-data-source';

import workoutRouter from './routes/WorkoutRoutes';
import categoryRouter from './routes/CategoryRoutes';
import workoutCategoryRouter from './routes/WorkoutCategoryRoutes';

const app: Application = express();
const PORT = 3002;

console.log('Starting workout-service...');

app.use(cors());
app.use(express.json());

app.use('/workouts', workoutRouter);
app.use('/categories', categoryRouter);
app.use('/workout-categories', workoutCategoryRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

AppDataSource.initialize()
  .then(() => {
    console.log('Workout DB connected');
    app.listen(PORT, () => {
      console.log(`Workout-service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });