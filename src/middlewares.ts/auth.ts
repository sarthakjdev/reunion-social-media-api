import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import messages from '@constants/messages'
import { UserFactory } from '@factory/userFactory'
import { DecodedPayload } from 'src/interfaces/decodedPayload'
import config from '../configs/config'
/**
 * Is Authenticated
 */
export default async function isAuthorized(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
        const token = req.headers?.authorization?.split(' ')[1]

        if (!token) return res.status(401).send(messages.invalidToken)
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY)

        const { email } = decoded as DecodedPayload
        const dbUser = await UserFactory.getUser(email)

        if (dbUser) return next()

        return res.status(400).send(messages.unauthorized_req)
    } catch (error) {
        console.log('error ', error)

        return res.status(500).send(messages.serverError)
    }
}
