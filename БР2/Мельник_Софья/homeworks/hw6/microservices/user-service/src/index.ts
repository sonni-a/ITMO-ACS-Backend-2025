import 'reflect-metadata';
import { AppDataSource } from './config/app-data-source';
import app from './app';
import { connectRabbit } from './rabbit/rabbit';

const PORT = 3001;

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log('User DB connected');

    await connectRabbit();
    console.log('RabbitMQ connected');

    app.listen(PORT, () => {
      console.log(`User-service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error during startup:', err);
  }
}

startServer();