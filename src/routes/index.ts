import express from 'express';
import userRoutes from './user';
import feedbackRoutes from './feedback';
import upvoteRoutes from './upvote';

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/upvotes', upvoteRoutes);

export default router;
