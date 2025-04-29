import express from 'express'
import { authMiddleware, checkAdmin } from '../middleware/auth.middleware.js';
import { createProblem } from '../controllers/problem.controller.js';

const router = express.Router();

router.post('/create',authMiddleware,checkAdmin,createProblem);


export default router