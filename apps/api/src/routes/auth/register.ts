import { Static, Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'

const RegisterBody = Type.Object({
  firstName: Type.String({ minLength: 1, maxLength: 70 }),
  lastName: Type.String({ minLength: 1, maxLength: 70 }),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
})

type RegisterBodyType = Static<typeof RegisterBody>

const register: FastifyPluginAsync = async fastify => {
  fastify.post<{
    Body: RegisterBodyType
  }>(
    '/register',
    {
      schema: {
        body: RegisterBody,
      },
    },
    async function (request, reply) {
      const { firstName, email, lastName, password } = request.body

      const existingUser = await fastify.prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return reply.badRequest('User already exists')
      }

      const hashedPassword = await this.argon2.hash(password)

      const user = await fastify.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      })

      request.session.user = user.id
      return reply.replyUser(this.exclude(user, 'password'))
    },
  )
}

export default register
