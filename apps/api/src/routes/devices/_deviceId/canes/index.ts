import { FastifyPluginAsync } from 'fastify'
import updateDevice from './update-device'

const canes: FastifyPluginAsync = async fastify => {
  fastify.register(updateDevice)
}

export default canes
