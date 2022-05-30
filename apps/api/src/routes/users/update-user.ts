import { Role } from '@prisma/client'
import { Static, Type } from '@sinclair/typebox'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { UserNoPassword, UserWithoutPasswordType } from './types'

const UpdateUser = Type.Object({
  firstName: Type.Optional(Type.String({ minLength: 1, maxLength: 70 })),
  lastName: Type.Optional(Type.String({ minLength: 1, maxLength: 70 })),
  email: Type.Optional(Type.String({ format: 'email' })),
  password: Type.Optional(Type.String()),
  role: Type.Optional(Type.Enum(Role)),
  pushToken: Type.Optional(Type.String()),
})

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

      // get pushToken from user
      const { pushToken } = user
      const data = request.body
      let arrayOfPushTokens: string[] = []

      if (data.pushToken) {
        if (pushToken) {
          arrayOfPushTokens = pushToken.split(', ')
        }
        if (!arrayOfPushTokens.includes(data.pushToken)) {
          arrayOfPushTokens.push(data.pushToken)
        }
      }

      const updatedUser = await fastify.prisma.user.update({
        where: { id },
        data: {
          ...data,
          pushToken: arrayOfPushTokens.join(', '),
        },
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
