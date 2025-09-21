import { Router } from 'express';
import { getPlans, getPlanById, createPlan, updatePlan, deletePlan } from '../controllers/PlanController';
import { authMiddleware } from '../middleware/authMiddleware';

const planRouter = Router();

planRouter.get('/', getPlans);
planRouter.get('/:id', getPlanById);
planRouter.post('/', authMiddleware, createPlan);
planRouter.put('/:id', authMiddleware, updatePlan);
planRouter.delete('/:id', authMiddleware, deletePlan);

export default planRouter;