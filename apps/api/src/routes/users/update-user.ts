import { Static, Type } from '@sinclair/typebox'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { User, UserNoPassword, UserWithoutPasswordType } from './types'

const UpdateUser = Type.Omit(User, ['id', 'role', 'password'])

export type UpdateUserType = Static<typeof UpdateUser>

const Params = Type.Object({
  id: Type.String({ format: 'uuid' }),
})

type ParamsType = Static<typeof Params>

const updateUser: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.put<{
    Body: UpdateUserType
    Params: ParamsType
    Reply: UserWithoutPasswordType
  }>(
    '/:id',
    {
      schema: {
        body: UpdateUser,
        params: Params,
        response: {
          200: UserNoPassword,
        },
      },
    },
    async request => {
      const { id } = request.params
      const user = await fastify.prisma.user.findUnique({
        where: { id },
      })

      fastify.assert.ok(user, 404, `User not found with id: ${id}`)

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
    },
  )
}

export default updateUser
