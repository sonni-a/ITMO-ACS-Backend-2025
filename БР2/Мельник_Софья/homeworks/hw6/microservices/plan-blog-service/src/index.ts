import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './config/app-data-source';

import blogPostRouter from './routes/BlogPostRoutes';
import planRouter from './routes/PlanRoutes';
import workoutPlanRouter from './routes/WorkoutPlanRoutes';

import { connectRabbit } from './rabbit/rabbit';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;

async function startServer() {
  try {
    console.log('Starting plan-blog-service...');

    await AppDataSource.initialize();
    console.log('Plan-blog-service DB connected');

    await connectRabbit();
    console.log('RabbitMQ connected');

    const app: Application = express();

    app.use(cors());
    app.use(express.json());

    app.use('/blogposts', blogPostRouter);
    app.use('/plans', planRouter);
    app.use('/workout-plans', workoutPlanRouter);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ message: err.message });
    });

    app.listen(PORT, () => {
      console.log(`Plan-blog-service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error during startup:', err);
  }
}

startServer();