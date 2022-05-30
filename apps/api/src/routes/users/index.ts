import { FastifyPluginAsync } from 'fastify'
import getUsers from './get-users'
import updateUser from './update-user'

const users: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(updateUser)
  fastify.register(getUsers)
}

export default users
