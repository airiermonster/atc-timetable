import express from 'express';
import { body } from 'express-validator';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('secondName').trim().notEmpty().withMessage('Second name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('admissionNumber').trim().notEmpty().withMessage('Admission number is required'),
  body('course').trim().notEmpty().withMessage('Course is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('ntaLevel').isInt({ min: 1, max: 3 }).withMessage('NTA level must be between 1 and 3'),
  body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], register);

router.post('/login', [
  body('admissionNumber').trim().notEmpty(),
  body('password').notEmpty(),
], login);

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;