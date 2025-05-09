import express from 'express'
import { check, login, logout, register } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/register',register);
router.post('/login',login);
router.delete('/logout',authMiddleware,logout);
router.get('/check',authMiddleware,check);

 

export default router