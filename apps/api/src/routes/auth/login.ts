import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { UserNoPassword } from '../users/types'

const Login = Type.Object(
  {
    email: Type.String({
      format: 'email',
    }),
    password: Type.String({ minLength: 6 }),
  },
  { additionalProperties: false },
)

export type LoginType = Static<typeof Login>

const LoginResponse = UserNoPassword

export type LoginResponseType = Static<typeof LoginResponse>

const login: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.post<{
    Body: LoginType
    Response: LoginResponseType
  }>(
    '/login',
    {
      schema: {
        body: Login,
        response: {
          200: LoginResponse,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await fastify.prisma.user.findUnique({
        where: { email },
      })
      if (!user) {
        return reply.unauthorized('Invalid credentials')
      }

      const isMatch = await fastify.argon2.verify(user.password, password)

      fastify.assert.ok(isMatch, 401, 'Invalid credentials')

      request.session.user = user.id
      return user
    },
  )
}
export default login
