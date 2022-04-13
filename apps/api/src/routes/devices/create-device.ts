import { FastifyPluginAsync } from 'fastify'
import { DevicePostBody, DevicePostBodyType } from './types'

const createDevice: FastifyPluginAsync = async fastify => {
  fastify.post<{
    Body: DevicePostBodyType
  }>(
    '/',
    {
      schema: {
        body: DevicePostBody,
      },
    },
    async (request, reply) => {
      const { description } = request.body
      const device = await fastify.prisma.device.create({
        data: {
          description,
          metadata: {
            create: {
              batteryLevel: 0,
              latitude: 0,
              longitude: 0,
              pulse: 0,
              responseTime: 3,
            },
          },
        },
      })
      reply.status(201).send(device)
    },
  )
}

export default createDevice
