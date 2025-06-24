import { Router } from 'express';
import { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/BlogPostController';
import { authMiddleware } from '../middleware/authMiddleware';

const blogPostRouter = Router();

/**
 * @swagger
 * /blogposts:
 *   get:
 *     summary: Получить список всех блог-постов
 *     tags:
 *       - BlogPosts
 *     responses:
 *       200:
 *         description: Список блог-постов успешно получен
 */
blogPostRouter.get('/', getBlogPosts);

/**
 * @swagger
 * /blogposts/{id}:
 *   get:
 *     summary: Получить блог-пост по ID
 *     tags:
 *       - BlogPosts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID блог-поста
 *     responses:
 *       200:
 *         description: Блог-пост успешно получен
 *       404:
 *         description: Блог-пост не найден
 */
blogPostRouter.get('/:id', getBlogPostById);

/**
 * @swagger
 * /blogposts:
 *   post:
 *     summary: Создать новый блог-пост
 *     tags:
 *       - BlogPosts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               authorId:
 *                 type: string
 *                 description: ID автора поста
 *     responses:
 *       201:
 *         description: Блог-пост успешно создан
 */
blogPostRouter.post('/', authMiddleware, createBlogPost);

/**
 * @swagger
 * /blogposts/{id}:
 *   put:
 *     summary: Обновить блог-пост
 *     tags:
 *       - BlogPosts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID блог-поста
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               authorId:
 *                 type: string
 *                 description: ID автора поста
 *     responses:
 *       200:
 *         description: Блог-пост успешно обновлен
 *       404:
 *         description: Блог-пост не найден
 */
blogPostRouter.put('/:id', authMiddleware, updateBlogPost);

/**
 * @swagger
 * /blogposts/{id}:
 *   delete:
 *     summary: Удалить блог-пост
 *     tags:
 *       - BlogPosts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID блог-поста
 *     responses:
 *       200:
 *         description: Блог-пост успешно удален
 *       404:
 *         description: Блог-пост не найден
 */
blogPostRouter.delete('/:id', authMiddleware, deleteBlogPost);

export default blogPostRouter;
