import { Router } from 'express'
import { body } from 'express-validator'
import { login, logout, me, register } from '../controllers/auth'
import currentUser from '../middlewares/current-user'
import validateRequest from '../middlewares/validate-request-handler'

const router = Router()

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  validateRequest,
  login,
)
router.post(
  '/register',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  validateRequest,
  register,
)
router.delete('/logout', logout)
router.post('/me', currentUser, me)

export default router
