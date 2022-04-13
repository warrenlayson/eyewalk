import { Static, Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
import {
  GetDevicesResponse,
  GetDevicesResponseType,
} from '../../../devices/types'

const Params = Type.Object({
  userId: Type.String({ format: 'uuid' }),
})

type ParamsType = Static<typeof Params>

const getDevices: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Params: ParamsType
    Reply: GetDevicesResponseType
  }>(
    '/',
    {
      schema: {
        params: Params,
        response: {
          200: GetDevicesResponse,
        },
      },
    },
    async request => {
      const { userId: ownerId } = request.params
      const devices = await fastify.prisma.device.findMany({
        where: {
          ownerId,
        },
        include: {
          metadata: {
            include: {
              caneUser: true,
            },
          },
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
