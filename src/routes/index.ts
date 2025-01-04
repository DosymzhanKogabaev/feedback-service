import express from 'express';
import userRoutes from './user';
import feedbackRoutes from './feedback';

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/feedback', feedbackRoutes);

export default router;
