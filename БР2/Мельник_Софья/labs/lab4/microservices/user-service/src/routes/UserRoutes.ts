import { Router } from 'express';
import {
  getUsers,
  getUserByIdOrEmail,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/search/email', getUserByIdOrEmail);
userRouter.get('/:id', getUserByIdOrEmail);
userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.patch('/:id', authMiddleware, updateUser);
userRouter.delete('/:id', authMiddleware, deleteUser);

export default userRouter;