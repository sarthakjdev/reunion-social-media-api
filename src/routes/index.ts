import express from 'express'
import authRouter from './auth'
import userRouter from './user'
import postRouter from './post'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/post', postRouter)

export default router
