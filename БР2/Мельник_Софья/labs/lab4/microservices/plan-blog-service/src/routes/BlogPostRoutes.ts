import { Router } from 'express';
import { 
  getBlogPosts, 
  getBlogPostById, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from '../controllers/BlogPostController';
import { authMiddleware } from '../middleware/authMiddleware';

const blogPostRouter = Router();

blogPostRouter.get('/', getBlogPosts);
blogPostRouter.get('/:id', getBlogPostById);
blogPostRouter.post('/', authMiddleware, createBlogPost);
blogPostRouter.put('/:id', authMiddleware, updateBlogPost);
blogPostRouter.delete('/:id', authMiddleware, deleteBlogPost);

export default blogPostRouter;