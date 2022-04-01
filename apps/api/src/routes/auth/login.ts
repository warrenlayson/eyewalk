import { Static, Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
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

type LoginType = Static<typeof Login>

const LoginResponse = UserNoPassword

type LoginResponseType = Static<typeof LoginResponse>

const login: FastifyPluginAsync = async fastify => {
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
    async function (request, reply) {
      const { email, password } = request.body

      const user = await this.prisma.user.findUnique({
        where: { email },
      })
      if (!user) {
        return reply.unauthorized('Invalid credentials')
      }

      const isMatch = await this.argon2.verify(user?.password, password)
      if (!isMatch) {
        return reply.unauthorized('Invalid credentials')
      }

      const userWithoutPass = this.exclude(user, 'password')

      request.session.user = user.id
      return reply.replyUser(userWithoutPass)
    },
  )
}
export default login
