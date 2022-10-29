import express from 'express'
import UserController from '@controllers/users'
import isAuthorized from 'src/middlewares.ts/auth'

const router = express.Router()

/**
 * get a user
 */
 router.get('/', isAuthorized, UserController.getUser)

/**
 * follow a user
 */
router.post('/follow/:id', isAuthorized, UserController.followUser)

/**
 * unfollow a user
 */
 router.post('/unfollow/:id',isAuthorized, UserController.unfollowUser)

export default router
