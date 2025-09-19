import { Router } from 'express';
import { 
  getWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout 
} from '../controllers/WorkoutController';
import { authMiddleware } from '../middleware/authMiddleware';

const workoutRouter = Router();

workoutRouter.get('/', getWorkouts);
workoutRouter.get('/:id', getWorkoutById);
workoutRouter.post('/', authMiddleware, createWorkout);
workoutRouter.put('/:id', authMiddleware, updateWorkout);
workoutRouter.delete('/:id', authMiddleware, deleteWorkout);

export default workoutRouter;