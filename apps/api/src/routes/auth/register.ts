import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { UserNoPassword } from '../users/types'

const RegisterBody = Type.Object({
  firstName: Type.String({ minLength: 1, maxLength: 70 }),
  lastName: Type.String({ minLength: 1, maxLength: 70 }),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
})

export type RegisterBodyType = Static<typeof RegisterBody>

const RegisterResponse = UserNoPassword

export type RegisterResponseType = Static<typeof RegisterResponse>

const register: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.post<{
    Body: RegisterBodyType
    Reply: RegisterResponseType
  }>(
    '/register',
    {
      schema: {
        body: RegisterBody,
        response: {
          201: RegisterResponse,
        },
      },
    },
    async request => {
      const { firstName, email, lastName, password } = request.body

      const existingUser = await fastify.prisma.user.findUnique({
        where: { email },
      })

      fastify.assert.ok(existingUser, 400, 'User already exists')

      const hashedPassword = await fastify.argon2.hash(password)

      const user = await fastify.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      })

      request.session.user = user.id
      return fastify.exclude(user, 'password')
    },
  )
}

export default register
