import { FastifyPluginAsync } from 'fastify'
import fastifyArgon2 from 'fastify-argon2'
import currentUser from './current-user'
import login from './login'
import logout from './logout'
import register from './register'

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify
    .register(fastifyArgon2)
    .register(login)
    .register(currentUser)
    .register(logout)
    .register(register)
}

export default auth
