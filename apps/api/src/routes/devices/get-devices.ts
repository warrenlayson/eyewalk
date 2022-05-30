import { FastifyPluginAsync } from 'fastify'
import { GetDevicesResponse, GetDevicesResponseType } from './types'

const getDevices: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Reply: GetDevicesResponseType
  }>(
    '/',
    {
      schema: {
        response: {
          200: GetDevicesResponse,
        },
      },
    },
    async () => {
      const devices = await fastify.prisma.device.findMany({
        include: {
          metadata: true,
        },
      })

      return devices.map(device => ({
        ...device,
        metadata: {
          ...device.metadata,
          createdAt: device.metadata.createdAt.toISOString(),
          updatedAt: device.metadata.updatedAt.toISOString(),
        },
      }))
    },
  )
}

export default getDevices
