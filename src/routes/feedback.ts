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

// CRUD
router.post('/', authenticateUser, createFeedback);
router.get('/:id', getFeedbackById);
router.put('/:id', authenticateUser, updateFeedback);
router.delete('/:id', authenticateUser, deleteFeedback);

router.get('/', getAllFeedback);

export default router;
