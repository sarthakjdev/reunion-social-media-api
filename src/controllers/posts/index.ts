import messages from "@constants/messages";
import { PostFactory } from "@factory/index";
import retrieveUser from "@helpers/authHelpers";
import { Request, Response } from "express";

export default class PostController {
    /**
     * get posts by id
     * @static
     * @memberof PostController
     */
    static async getPost(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send(messages.badReq)

            const post = await PostFactory.getPost(Number(id))

            if (!post) return res.status(404).send(messages.notFound)

            return res.status(200).json({
                success: true,
                message: messages.success,
                post: post
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * get posts of the user
     * @static
     * @memberof UserController
     */
     static async getPostsOfUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await retrieveUser(req)

            const posts = await PostFactory.getPostByUser(user.id)

            return res.status(200).json({
                success: true,
                message: messages.success,
                posts: posts
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * create a post
     * @static
     * @memberof PostController
     */
    static async createPost(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send(messages.badReq)

            const post = await PostFactory.getPost(Number(id))

            if (!post) return res.status(404).send(messages.notFound)

            return res.status(200).json({
                success: true,
                message: messages.success,
                post: post
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * delete a post
     * @static
     * @memberof PostController
     */
    static async deletePost(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send(messages.badReq)

            const post = await PostFactory.deletePost(Number(id))

            return res.status(200).json({
                success: true,
                message: messages.success,
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * like a post
     * @static
     * @memberof PostController
     */
    static async likePost(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send(messages.badReq)

            const user = await retrieveUser(req)
            const post = await PostFactory.likePost(Number(id), user.id)

            if (!post) return res.status(404).send(messages.notFound)

            return res.status(200).json({
                success: true,
                message: messages.success,
                post: post
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * unlike a post
     * @static
     * @memberof PostController
     */
    static async unlikePost(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send(messages.badReq)

            const user = await retrieveUser(req)
            await PostFactory.unlikePost(Number(id), user.id)

            return res.status(200).json({
                success: true,
                message: messages.success,
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * comment a post
     * @static
     * @memberof PostController
     */
     static async commentPost(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params
            const   {comment} = req.body
            if(!id || !comment) return res.status(400).send(messages.badReq)

            const user = await retrieveUser(req)
            const post = await PostFactory.commentPost({post_id: Number(id) , text: comment, user_id: user.id} as any)

            if(!post) return res.status(404).send(messages.notFound)

            return res.status(200).json({
                success: true,
                message: messages.success,
                comment: comment
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

}
