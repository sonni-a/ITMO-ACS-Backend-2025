import 'reflect-metadata';
import { AppDataSource } from './config/app-data-source';
import app from './app';

const PORT = 3001;

AppDataSource.initialize()
  .then(() => {
    console.log('User DB connected');
    app.listen(PORT, () => {
      console.log(`User-service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });
