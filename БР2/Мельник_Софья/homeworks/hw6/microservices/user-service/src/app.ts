import express from 'express';
import cors from 'cors';
import userRouter from './routes/UserRoutes';
import userProgressRouter from './routes/UserProgressRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

app.use('/user-progress', userProgressRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'user-service' });
});

export default app;