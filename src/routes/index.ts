import express from 'express';
import userRoutes from './user';
import feedbackRoutes from './feedback';
import upvoteRoutes from './upvote';
import metaRoutes from './meta';

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/upvotes', upvoteRoutes);
router.use('/', metaRoutes);

export default router;
