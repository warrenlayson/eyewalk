import { Static, Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
import { User } from './types'

const UpdateUser = Type.Omit(User, ['id', 'role', 'password'])

export type UpdateUserType = Static<typeof UpdateUser>

const Params = Type.Object({
  id: Type.Number(),
})

type ParamsType = Static<typeof Params>

const updateUser: FastifyPluginAsync = async fastify => {
  fastify.put<{
    Body: UpdateUserType
    Params: ParamsType
  }>(
    '/:id',
    {
      schema: {
        body: UpdateUser,
        params: Params,
      },
    },
    async request => {
      const { id } = request.params
      try {
        const user = await fastify.prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          return fastify.httpErrors.notFound()
        }

        const updatedUser = await fastify.prisma.user.update({
          where: { id },
          data: request.body,
          select: {
            id: true,
            firstName: true,
            email: true,
            lastName: true,
            role: true,
          },
        })

        return updatedUser
      } catch (e) {
        fastify.log.error(e)
        return fastify.httpErrors.internalServerError()
      }
    },
  )
}

export default updateUser
