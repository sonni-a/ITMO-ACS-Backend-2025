/// <reference path="./types/express/index.d.ts" />
import 'reflect-metadata';
import { AppDataSource } from './config/app-data-source';
import app from './app';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swaggerOptions';

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
      console.log('Application is up and running on http://localhost:3000');
      console.log('Swagger docs available at http://localhost:3000/api-docs');
    });
  })
  .catch((error) => console.error('Error during Data Source initialization', error));