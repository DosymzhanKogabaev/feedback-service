import express from 'express';
import {
  createFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
  getAllFeedback,
} from '../controllers/feedback';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: API for working with feedbacks
 */

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create new feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               statusId:
 *                 type: integer
 *             example:
 *               title: Add dark mode
 *               description: Dark mode for the interface
 *               categoryId: 1
 *               statusId: 1
 *     responses:
 *       201:
 *         description: Successfully created feedback
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateUser, createFeedback);

/**
 * @swagger
 * /feedback/{id}:
 *   get:
 *     summary: Get feedback by ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: feedback's ID
 *     responses:
 *       200:
 *         description: Successfully received feedback data
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getFeedbackById);

/**
 * @swagger
 * /feedback/{id}:
 *   put:
 *     summary: Update feedback info
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: feedback's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               statusId:
 *                 type: integer
 *             example:
 *               title: Update dark mode
 *               description: Improved dark mode UI
 *               categoryId: 2
 *               statusId: 2
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to update this feedback
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticateUser, updateFeedback);

/**
 * @swagger
 * /feedback/{id}:
 *   delete:
 *     summary: Delete feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Feedback's ID
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to delete this feedback
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticateUser, deleteFeedback);

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get All Feedbacks
 *     tags: [Feedback]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Functionality, Bug, UI, Performance]
 *         description: Category of the feedback
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Idea, Planned, In Progress, Completed]
 *         description: Status of the feedback
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [upvotes, createdAt]
 *         description: Sorting feedbacks
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page Number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Page Size
 *     responses:
 *       200:
 *         description: Feedbacks list
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllFeedback);

export default router;
