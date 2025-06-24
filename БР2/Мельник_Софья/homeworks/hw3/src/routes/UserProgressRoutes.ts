import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getUserProgresses, getUserProgressById, createUserProgress, updateUserProgress, deleteUserProgress } from '../controllers/UserProgressController';

const userProgressRouter = Router();

/**
 * @swagger
 * /user-progress:
 *   get:
 *     summary: Получить список прогресса всех пользователей
 *     tags:
 *       - User Progress
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешно получен список прогресса
 */
userProgressRouter.get('/', authMiddleware, getUserProgresses);

/**
 * @swagger
 * /user-progress/{id}:
 *   get:
 *     summary: Получить прогресс пользователя по ID
 *     tags:
 *       - User Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID прогресса пользователя
 *     responses:
 *       200:
 *         description: Прогресс пользователя успешно получен
 *       404:
 *         description: Прогресс не найден
 */
userProgressRouter.get('/:id', authMiddleware, getUserProgressById);

/**
 * @swagger
 * /user-progress:
 *   post:
 *     summary: Создать запись о прогрессе пользователя
 *     tags:
 *       - User Progress
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - progress_date
 *               - weight
 *               - completed_workouts
 *             properties:
 *               userId:
 *                 type: integer
 *               progress_date:
 *                 type: string
 *                 format: date
 *               weight:
 *                 type: number
 *               completed_workouts:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Запись успешно создана
 *       404:
 *         description: Пользователь не найден
 */
userProgressRouter.post('/', authMiddleware, createUserProgress);

/**
 * @swagger
 * /user-progress/{id}:
 *   put:
 *     summary: Обновить запись о прогрессе пользователя
 *     tags:
 *       - User Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID прогресса пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               progress_date:
 *                 type: string
 *                 format: date
 *               weight:
 *                 type: number
 *               completed_workouts:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Запись успешно обновлена
 *       404:
 *         description: Запись не найдена
 */
userProgressRouter.put('/:id', authMiddleware, updateUserProgress);

/**
 * @swagger
 * /user-progress/{id}:
 *   delete:
 *     summary: Удалить запись о прогрессе пользователя
 *     tags:
 *       - User Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID прогресса пользователя
 *     responses:
 *       200:
 *         description: Запись успешно удалена
 *       404:
 *         description: Запись не найдена
 */
userProgressRouter.delete('/:id', authMiddleware, deleteUserProgress);

export default userProgressRouter;