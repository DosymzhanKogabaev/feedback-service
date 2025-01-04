import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/user';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for authorization
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: New User Registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *           example:
 *             email: user@example.com
 *             password: password123
 *             avatar: https://example.com/avatar.png
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User authorization
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: user@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully received user data
 *       401:
 *         description: No token provided
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/me', getMe);

export default router;
