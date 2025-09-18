import { Router } from 'express';
import {
  getUserProgresses,
  getUserProgressById,
  createUserProgress,
  updateUserProgress,
  deleteUserProgress,
} from '../controllers/UserProgressController';
import { authMiddleware } from '../middleware/authMiddleware';

const userProgressRouter = Router();

userProgressRouter.get('/', authMiddleware, getUserProgresses);
userProgressRouter.get('/:id', authMiddleware, getUserProgressById);
userProgressRouter.post('/', authMiddleware, createUserProgress);
userProgressRouter.put('/:id', authMiddleware, updateUserProgress);
userProgressRouter.delete('/:id', authMiddleware, deleteUserProgress);

export default userProgressRouter;