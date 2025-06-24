import { Router } from 'express';
import { getWorkoutPlans, getWorkoutPlanById, createWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan } from '../controllers/WorkoutPlanController';
import { authMiddleware } from '../middleware/authMiddleware';

const workoutPlanRouter = Router();

/**
 * @swagger
 * /workout-plans:
 *   get:
 *     summary: Получить список всех планов тренировок
 *     tags:
 *       - WorkoutPlans
 *     responses:
 *       200:
 *         description: Список планов тренировок успешно получен
 */
workoutPlanRouter.get('/', getWorkoutPlans);

/**
 * @swagger
 * /workout-plans/{id}:
 *   get:
 *     summary: Получить план тренировок по ID
 *     tags:
 *       - WorkoutPlans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана тренировок
 *     responses:
 *       200:
 *         description: План успешно получен
 *       404:
 *         description: План не найден
 */
workoutPlanRouter.get('/:id', getWorkoutPlanById);

/**
 * @swagger
 * /workout-plans:
 *   post:
 *     summary: Создать новый план тренировок
 *     tags:
 *       - WorkoutPlans
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan
 *               - workout
 *               - day_of_week
 *               - details
 *               - calories_burned
 *             properties:
 *               plan:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               workout:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               day_of_week:
 *                 type: string
 *               details:
 *                 type: string
 *               calories_burned:
 *                 type: number
 *     responses:
 *       201:
 *         description: План тренировок успешно создан
 */
workoutPlanRouter.post('/', authMiddleware, createWorkoutPlan);

/**
 * @swagger
 * /workout-plans/{id}:
 *   put:
 *     summary: Обновить существующий план тренировок
 *     tags:
 *       - WorkoutPlans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана тренировок
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               workout:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               day_of_week:
 *                 type: string
 *               details:
 *                 type: string
 *               calories_burned:
 *                 type: number
 *     responses:
 *       200:
 *         description: План тренировок успешно обновлен
 *       404:
 *         description: План не найден
 */
workoutPlanRouter.put('/:id', authMiddleware, updateWorkoutPlan);

/**
 * @swagger
 * /workout-plans/{id}:
 *   delete:
 *     summary: Удалить план тренировок
 *     tags:
 *       - WorkoutPlans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана тренировок
 *     responses:
 *       200:
 *         description: План тренировок успешно удален
 *       404:
 *         description: План не найден
 */
workoutPlanRouter.delete('/:id', authMiddleware, deleteWorkoutPlan);

export default workoutPlanRouter;
