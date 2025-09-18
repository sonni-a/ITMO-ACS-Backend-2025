import { Router } from 'express';
import { 
  getWorkoutCategories, getWorkoutCategoryById, createWorkoutCategory, 
  updateWorkoutCategory, deleteWorkoutCategory 
} from '../controllers/WorkoutCategoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const workoutCategoryRouter = Router();

workoutCategoryRouter.get('/', getWorkoutCategories);
workoutCategoryRouter.get('/:id', getWorkoutCategoryById);
workoutCategoryRouter.post('/', authMiddleware, createWorkoutCategory);
workoutCategoryRouter.put('/:id', authMiddleware, updateWorkoutCategory);
workoutCategoryRouter.delete('/:id', authMiddleware, deleteWorkoutCategory);

export default workoutCategoryRouter;