import { Router } from 'express';
import { getWorkoutCategories, getWorkoutCategoryById, createWorkoutCategory, updateWorkoutCategory, deleteWorkoutCategory } from '../controllers/WorkoutCategoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const workoutCategoryRouter = Router();

/**
 * @swagger
 * /workout-categories:
 *   get:
 *     summary: Получить список всех категорий тренировок
 *     tags:
 *       - WorkoutCategories
 *     responses:
 *       200:
 *         description: Список категорий тренировок успешно получен
 */
workoutCategoryRouter.get('/', getWorkoutCategories);

/**
 * @swagger
 * /workout-categories/{id}:
 *   get:
 *     summary: Получить категорию тренировок по ID
 *     tags:
 *       - WorkoutCategories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID категории тренировок
 *     responses:
 *       200:
 *         description: Категория успешно получена
 *       404:
 *         description: Категория не найдена
 */
workoutCategoryRouter.get('/:id', getWorkoutCategoryById);

/**
 * @swagger
 * /workout-categories:
 *   post:
 *     summary: Создать новую категорию для тренировки
 *     tags:
 *       - WorkoutCategories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workout
 *               - category
 *             properties:
 *               workout:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               category:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *     responses:
 *       201:
 *         description: Категория успешно создана
 */
workoutCategoryRouter.post('/', authMiddleware, createWorkoutCategory);

/**
 * @swagger
 * /workout-categories/{id}:
 *   put:
 *     summary: Обновить существующую категорию для тренировки
 *     tags:
 *       - WorkoutCategories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID категории тренировок
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workout:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               category:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *     responses:
 *       200:
 *         description: Категория успешно обновлена
 *       404:
 *         description: Категория не найдена
 */
workoutCategoryRouter.put('/:id', authMiddleware, updateWorkoutCategory);

/**
 * @swagger
 * /workout-categories/{id}:
 *   delete:
 *     summary: Удалить категорию для тренировки
 *     tags:
 *       - WorkoutCategories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID категории тренировок
 *     responses:
 *       200:
 *         description: Категория успешно удалена
 *       404:
 *         description: Категория не найдена
 */
workoutCategoryRouter.delete('/:id', authMiddleware, deleteWorkoutCategory);

export default workoutCategoryRouter;
