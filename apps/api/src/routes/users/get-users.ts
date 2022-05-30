import { FastifyPluginAsync } from 'fastify'
import { GetUsers, GetUsersType } from './types'

const getUsers: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Reply: GetUsersType
  }>(
    '/',
    {
      schema: {
        response: {
          200: GetUsers,
        },
      },
    },
    async () => {
      const users = await fastify.prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      })

      return users
    },
  )
}

export default getUsers
