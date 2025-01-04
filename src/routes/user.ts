import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/user';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);

export default router;
