import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async (_, reply) => {
    reply.send({ root: true })
  })
}

export default root
