import prisma, { user } from '@lib/prisma'
import { LikeOnPost, Post, User, Comment } from '@prisma/client'

export class PostFactory {
    /**
     * get all posts by a user
     * @static
     * @memberof PostFactory
     */
    static async getPostByUser(userId: number): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                user_id: userId
            },
            include: {
                comments: true,
                _count: {
                    select: {
                        liked_by: true,
                        comments: true,
                    }
                }
            }
        })

        return posts
    }

    /**
     * get post
     * @static
     * @memberof PostFactory
     */
    static async getPost(id: number): Promise<Post> {
        const post = await prisma.post.findFirst({
            where: {
                id,
            },
            include: {
                _count: {
                    select: {
                        liked_by: true,
                        comments: true,
                    }
                }
            }
        })

        return post
    }

    /**
     * create post
     * @static
     * @memberof PostFactory
     */
    static async createPost(postData: Post): Promise<Post> {
        const post = await prisma.post.create({
            data: {
                ...postData
            }
        })

        return post
    }

    /**
    * like post
    * @static
    * @memberof PostFactory
    */
    static async likePost(postId: number, userId: number): Promise<LikeOnPost> {
        const likedPost = await prisma.likeOnPost.create({
            data: {
                post_id: postId,
                user_id: userId
            },
        })

        return likedPost
    }

    /**
     * unlike post
     * @static
     * @memberof PostFactory
     */
    static async unlikePost(postId: number, userId: number): Promise<void> {
        await prisma.likeOnPost.delete({
            where: {
                user_id_post_id: { user_id: userId, post_id: postId }
            },
        })

    }

    /**
    * comment on post
    * @static
    * @memberof PostFactory
    */
    static async commentPost(commentData: Comment): Promise<Comment> {
        const comment = await prisma.comment.create({
            data: {
                ...commentData
            },
        })

        return comment
    }

    /**
     * delete post
     * @static
     * @memberof PostFactory
     */
    static async deletePost(id: number): Promise<void> {

        await prisma.post.delete({
            where: {
                id
            }
        })

    }
}
