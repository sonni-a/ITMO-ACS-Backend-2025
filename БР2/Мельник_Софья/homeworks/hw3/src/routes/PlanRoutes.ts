import { Router } from 'express';
import { getPlans, getPlanById, createPlan, updatePlan, deletePlan } from '../controllers/PlanController';
import { authMiddleware } from '../middleware/authMiddleware';

const planRouter = Router();

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Получить список всех планов
 *     tags:
 *       - Plans
 *     responses:
 *       200:
 *         description: Список планов успешно получен
 */
planRouter.get('/', getPlans);

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Получить план по ID
 *     tags:
 *       - Plans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана
 *     responses:
 *       200:
 *         description: План успешно получен
 *       404:
 *         description: План не найден
 */
planRouter.get('/:id', getPlanById);

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Создать новый план
 *     tags:
 *       - Plans
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
 *               - userId
 *               - start_date
 *               - end_date
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: План успешно создан
 */
planRouter.post('/', authMiddleware, createPlan);

/**
 * @swagger
 * /plans/{id}:
 *   put:
 *     summary: Обновить существующий план
 *     tags:
 *       - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана
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
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: План успешно обновлен
 *       404:
 *         description: План не найден
 */
planRouter.put('/:id', authMiddleware, updatePlan);

/**
 * @swagger
 * /plans/{id}:
 *   delete:
 *     summary: Удалить план
 *     tags:
 *       - Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана
 *     responses:
 *       200:
 *         description: План успешно удален
 *       404:
 *         description: План не найден
 */
planRouter.delete('/:id', deletePlan);

export default planRouter;
