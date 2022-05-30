import { FastifyPluginAsync } from 'fastify'
import { COOKIE_NAME } from '../../constants'

const logout: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.delete('/logout', async (request, reply) => {
    if (request.session.user) {
      return new Promise(res => {
        reply.clearCookie(COOKIE_NAME)
        request.session.destroy(err => {
          if (err) {
            fastify.log.info(err.message)
            res(reply.internalServerError(err.message))
            return
          }

          res(reply.send(true))
        })
      })
    }
    return reply.send(true)
  })
}

export default logout
