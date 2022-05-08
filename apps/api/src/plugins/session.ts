import fastifySession from '@fastify/session'
import connectRedis from 'connect-redis'
import cookie from '@fastify/cookie'
import fp from 'fastify-plugin'
import Redis from 'ioredis'
import { COOKIE_NAME, PROD } from '../constants'

export default fp(
  async fastify => {
    const RedisStore = connectRedis(fastifySession as any)
    const redisClient = new Redis(process.env.REDIS_URL!)
    fastify.register(cookie)
    fastify.register(fastifySession, {
      secret: process.env.SESSION_SECRET!,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }) as any,
      cookieName: COOKIE_NAME,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: PROD,
        sameSite: 'lax',
      },
      saveUninitialized: false,
    })

    fastify.addHook('onClose', async () => {
      redisClient.disconnect()
    })
  },
  { name: 'session' },
)

declare module 'fastify' {
  interface Session {
    user: string
  }
}
