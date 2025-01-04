import express from 'express';
import { getCategories, getStatuses } from '../controllers/meta';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meta
 *   description: Endpoints to get categories and statuses
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get a list of all categories
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/categories', getCategories);

/**
 * @swagger
 * /statuses:
 *   get:
 *     summary: Get a list of all statuses
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: List of statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/statuses', getStatuses);

export default router;
