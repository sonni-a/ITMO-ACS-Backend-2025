import { Router } from 'express';
import { 
  getWorkoutPlans, 
  getWorkoutPlanById, 
  createWorkoutPlan, 
  updateWorkoutPlan, 
  deleteWorkoutPlan 
} from '../controllers/WorkoutPlanController';
import { authMiddleware } from '../middleware/authMiddleware';

const workoutPlanRouter = Router();

workoutPlanRouter.get('/', getWorkoutPlans);
workoutPlanRouter.get('/:id', getWorkoutPlanById);
workoutPlanRouter.post('/', authMiddleware, createWorkoutPlan);
workoutPlanRouter.put('/:id', authMiddleware, updateWorkoutPlan);
workoutPlanRouter.delete('/:id', authMiddleware, deleteWorkoutPlan);

export default workoutPlanRouter;