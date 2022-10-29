import express from 'express'
import AuthController from '@controllers/auth'

const router = express.Router()

/**
 * signin
 */
router.post('/login', AuthController.login)

export default router
