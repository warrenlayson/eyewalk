import { FastifyPluginAsync } from 'fastify'
import connectDevice from './connect-device'
import getDevice from './get-device'
import getDevices from './get-devices'

const devices: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(getDevices)
  fastify.register(connectDevice)
  fastify.register(getDevice)
}

export default devices
