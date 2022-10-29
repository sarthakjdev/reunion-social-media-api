import express from 'express'
import PostController from '@controllers/posts'
import isAuthorized from 'src/middlewares.ts/auth'

const router = express.Router()


/**
 * create a post
 */
router.post('/', isAuthorized, PostController.createPost)

/**
 * get all post of  user
 */
router.delete('/all_posts', isAuthorized, PostController.getPostsOfUser)

/**
 * get a post
 */
router.get('/:id', isAuthorized, PostController.getPost)

/**
 * like a post
 */
router.put('/like/:id', isAuthorized, PostController.likePost)

/**
 * unliike a post
 */
router.put('/unlike/:id', isAuthorized, PostController.unlikePost)

/**
* comment a post
*/
router.put('/comment/:id', isAuthorized, PostController.commentPost)

/**
* delete post
*/
router.delete('/delete/:id', isAuthorized, PostController.deletePost)

export default router
