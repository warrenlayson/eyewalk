import { PrismaClient } from '@prisma/client'
import fp from 'fastify-plugin'
import prisma from '../client'

export default fp(
  async fastify => {
    await prisma.$connect()

    function exclude<User, Key extends keyof User>(
      user: User,
      ...keys: Key[]
    ): Omit<User, Key> {
      const result = user
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        delete result[key]
      }
      return user
    }

    // Make prisma client available through the fastify server intance: server.rpisma
    fastify.decorate('prisma', prisma).decorate('exclude', exclude)

    fastify.addHook('onClose', async server => {
      await server.prisma.$disconnect()
    })
  },
  { name: 'prisma' },
)
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    exclude<User, Key extends keyof User>(
      user: User,
      ...keys: Key[]
    ): Omit<User, Key>
  }
}
