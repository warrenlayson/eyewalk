import { FastifyPluginAsync } from 'fastify'
import updateUser from './update-user'

const users: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(updateUser)
  fastify.get('/users', async () => ({ root: 'hello' }))
}

export default users
