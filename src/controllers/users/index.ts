import messages from "@constants/messages";
import { UserFactory } from "@factory/index";
import retrieveUser from "@helpers/authHelpers";
import { Request, Response } from "express";

export default class UserController {
    /**
     * get users
     * @static
     * @memberof UserController
     */
    static async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await retrieveUser(req)

            if (!user) return res.status(404).send(messages.notFound)

            return res.status(200).json({
                success: true,
                message: messages.success,
                user: user
            })

        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * follow a user
     * @static
     * @memberof UserController
     */
     static async followUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            if(!id) return res.status(400).send(messages.badReq)

            const user = await retrieveUser(req)
            
            const follow = await UserFactory.followUser(user.id, Number(id))

            return res.status(200).json({
                success: true,
                message: messages.success,
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * unfollow a user
     * @static
     * @memberof UserController
     */
     static async unfollowUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            if(!id) return res.status(400).send(messages.badReq)

            const user = await retrieveUser(req)

            const follow = await UserFactory.unfollowUser(user.id, Number(id))

            return res.status(200).json({
                success: true,
                message: messages.success,
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

}
