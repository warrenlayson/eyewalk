import { FastifyPluginAsync } from 'fastify'
import createDevice from './create-device'
import getDevice from './get-device'
import getDevices from './get-devices'
import updateDevice from './update-device'

const devices: FastifyPluginAsync = async fastify => {
  fastify.register(getDevices)

  fastify.register(createDevice)
  fastify.register(updateDevice)
  fastify.register(getDevice)
}

export default devices
