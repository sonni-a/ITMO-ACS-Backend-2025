import { Router } from 'express';
import { getUserByIdOrEmail, createUser, getUsers, updateUser, deleteUser, loginUser } from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список всех пользователей
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей успешно получен
 */
userRouter.get('/', authMiddleware, getUsers);

/**
 * @swagger
 * /users/search/email:
 *   get:
 *     summary: Получить пользователя по email
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email пользователя
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Пользователь не найден
 */
userRouter.get('/search/email', authMiddleware, getUserByIdOrEmail);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Пользователь не найден
 */
userRouter.get('/:id', authMiddleware, getUserByIdOrEmail);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Частично обновить данные пользователя
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               gender:
 *                 type: string
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               goal:
 *                 type: string
 *               experience_level:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пользователь успешно обновлен
 *       404:
 *         description: Пользователь не найден
 */
userRouter.patch('/:id', authMiddleware, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно удален
 *       404:
 *         description: Пользователь не найден
 */
userRouter.delete('/:id', authMiddleware, deleteUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 */
userRouter.post('/', createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Вход пользователя
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход, возвращает токен
 *       401:
 *         description: Неверные учетные данные
 */
userRouter.post('/login', loginUser);

export default userRouter;