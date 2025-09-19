import { Router } from 'express';
import { 
  getCategories, getCategoryById, createCategory, updateCategory, deleteCategory 
} from '../controllers/CategoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.post('/', authMiddleware, createCategory);
categoryRouter.put('/:id', authMiddleware, updateCategory);
categoryRouter.delete('/:id', authMiddleware, deleteCategory);

export default categoryRouter;
