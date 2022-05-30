import fastifyAuth from '@fastify/auth'
import { Static } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
import { UserNoPassword } from '../users/types'

const CurrentUser = UserNoPassword

export type CurrentUserType = Static<typeof CurrentUser>

const currentUser: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(fastifyAuth).after(() => {
    fastify.get<{ Reply: CurrentUserType }>(
      '/me',
      {
        preHandler: fastify.auth([fastify.isLoggedIn]),
        schema: {
          response: {
            200: CurrentUser,
          },
        },
      },
      async (request, reply) => {
        const user = await fastify.prisma.user.findUnique({
          where: { id: request.session.user! },
          select: {
            id: true,
            email: true,
            role: true,
            firstName: true,
            lastName: true,
            pushToken: true,
          },
        })

        reply.send(user!)
      },
    )
  })
}
export default currentUser
