import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './config/app-data-source';

import workoutRouter from './routes/WorkoutRoutes';
import categoryRouter from './routes/CategoryRoutes';
import workoutCategoryRouter from './routes/WorkoutCategoryRoutes';

import { connectRabbit, consumeEvents } from './rabbit/rabbit';

const PORT = 3002;

async function startServer() {
  try {
    console.log('Starting workout-service...');

    await AppDataSource.initialize();
    console.log('Workout DB connected');

    await connectRabbit();
    console.log('RabbitMQ connected');

    await consumeEvents();
    console.log('RabbitMQ consumers started');

    const app: Application = express();

    app.use(cors());
    app.use(express.json());

    app.use('/workouts', workoutRouter);
    app.use('/categories', categoryRouter);
    app.use('/workout-categories', workoutCategoryRouter);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ message: err.message });
    });

    app.listen(PORT, () => {
      console.log(`Workout-service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error during startup:', err);
  }
}

startServer();