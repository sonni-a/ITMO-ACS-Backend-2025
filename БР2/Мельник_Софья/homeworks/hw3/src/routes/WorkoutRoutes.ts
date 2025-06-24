import { Router } from 'express';
import { getWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout } from '../controllers/WorkoutController';
import { authMiddleware } from '../middleware/authMiddleware';

const workoutRouter = Router();

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Получить список всех тренировок
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: Список тренировок успешно получен
 */
workoutRouter.get('/', getWorkouts);

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Получить тренировку по ID
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID тренировки
 *     responses:
 *       200:
 *         description: Тренировка успешно получена
 *       404:
 *         description: Тренировка не найдена
 */
workoutRouter.get('/:id', getWorkoutById);

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Создать новую тренировку
 *     tags:
 *       - Workouts
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
 *               - description
 *               - duration
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *                 description: Продолжительность в минутах
 *     responses:
 *       201:
 *         description: Тренировка успешно создана
 */
workoutRouter.post('/', authMiddleware, createWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     summary: Обновить существующую тренировку
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID тренировки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *                 description: Продолжительность в минутах
 *     responses:
 *       200:
 *         description: Тренировка успешно обновлена
 *       404:
 *         description: Тренировка не найдена
 */
workoutRouter.put('/:id', authMiddleware, updateWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Удалить тренировку
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID тренировки
 *     responses:
 *       200:
 *         description: Тренировка успешно удалена
 *       404:
 *         description: Тренировка не найдена
 */
workoutRouter.delete('/:id', authMiddleware, deleteWorkout);

export default workoutRouter;
