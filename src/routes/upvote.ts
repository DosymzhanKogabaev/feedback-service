import express from 'express';
import { upvoteFeedback, removeUpvote } from '../controllers/upvote';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Upvotes
 *   description: API for working with upvotes
 */

/**
 * @swagger
 * /upvotes/{id}:
 *   post:
 *     summary: Adding a vote for a feedback
 *     tags: [Upvotes]
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
 *       201:
 *         description: Upvote added successfully
 *       400:
 *         description: You have already upvoted this feedback
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id', authenticateUser, upvoteFeedback);

/**
 * @swagger
 * /upvotes/{id}:
 *   delete:
 *     summary: Deleting an upvote
 *     tags: [Upvotes]
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
 *         description: Upvote removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Upvote not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticateUser, removeUpvote);

export default router;
