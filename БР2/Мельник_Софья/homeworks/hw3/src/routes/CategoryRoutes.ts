import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/CategoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const categoryRouter = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Получить список всех категорий
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Список категорий успешно получен
 */
categoryRouter.get('/', getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Получить категорию по ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID категории
 *     responses:
 *       200:
 *         description: Категория успешно получена
 *       404:
 *         description: Категория не найдена
 */
categoryRouter.get('/:id', getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Создать новую категорию
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категория успешно создана
 */
categoryRouter.post('/', createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Обновить существующую категорию
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID категории
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Категория успешно обновлена
 *       404:
 *         description: Категория не найдена
 */
categoryRouter.put('/:id', updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Удалить категорию
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID категории
 *     responses:
 *       200:
 *         description: Категория успешно удалена
 *       404:
 *         description: Категория не найдена
 */
categoryRouter.delete('/:id', authMiddleware, deleteCategory);

export default categoryRouter;
