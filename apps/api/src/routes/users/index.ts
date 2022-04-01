import { FastifyPluginAsync } from 'fastify'

const users: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/users', async (_, reply) => {
    reply.send({
      message: 'Hello World',
    })
  })
}

export default users
