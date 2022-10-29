import prisma from '@lib/prisma'
import { Follow, User } from '@prisma/client'

export class UserFactory {
    /**
     * get user
     * @static
     * @memberof UserFactory
     */
    static async getUser(email: string): Promise<User> {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
            include: {
                _count: {
                    select: {
                        followers: true,
                        following: true
                    }
                }
            }
        })

        return user
    }

    /**
     * Update auth token
     * @static
     * @memberof UserFactory
     */
     static async updateAuthToken(user: User, token: string) {
        const dbUser = await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                authToken: token,
            },
        })

        return dbUser
    }

    /**
     * follow user
     * @static
     * @memberof UserFactory
     */
     static async followUser(followerId: number, followingId: number): Promise<Follow> {
        const follow = await prisma.follow.create({
            data: {
                following_id: followingId ,
                follower_id: followerId
            },
        })

        return follow
    }

    /**
     * unfollow user
     * @static
     * @memberof UserFactory
     */
     static async unfollowUser(followerId: number, followingId: number): Promise<void> {
        await prisma.follow.delete({
            where: {
                follower_id_following_id: {follower_id: followerId, following_id: followingId}
            },
        })
    }

}
