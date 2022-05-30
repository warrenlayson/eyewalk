import { User } from '@prisma/client'
import { preHandlerHookHandler } from 'fastify'
import fp from 'fastify-plugin'

export type UserWithProfile = Omit<User, 'password'>

export default fp(
  async server => {
    const isLoggedIn: preHandlerHookHandler = (request, reply, done) => {
      if (!request.session.user) {
        reply.status(401)
        return done(new Error('Not logged in'))
      }

      return done()
    }

    const formatUser = (user: UserWithProfile) => ({
      ...user,
    })

    server
      .decorate('formatUser', formatUser)
      .decorateReply('replyUser', function (user: UserWithProfile) {
        this.send(formatUser(user))
      })
      .decorate('isLoggedIn', isLoggedIn)
  },
  { dependencies: ['prisma', 'session'] },
)

declare module 'fastify' {
  interface FastifyInstance {
    isLoggedIn: preHandlerHookHandler
  }

  interface FastifyReply {
    replyUser: (user: UserWithProfile) => void
  }
}
