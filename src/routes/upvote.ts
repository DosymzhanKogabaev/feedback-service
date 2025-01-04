import express from 'express';
import { upvoteFeedback, removeUpvote } from '../controllers/upvote';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.post('/:id', authenticateUser, upvoteFeedback);
router.delete('/:id', authenticateUser, removeUpvote);

export default router;
