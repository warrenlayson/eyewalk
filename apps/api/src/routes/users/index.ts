import { FastifyPluginAsync } from 'fastify'
import updateUser from './update-user'

const users: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(updateUser)
}

export default users
