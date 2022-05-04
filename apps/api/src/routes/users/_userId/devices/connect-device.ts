import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import {
  GetDeviceResponse,
  GetDeviceResponseType,
} from '../../../devices/types'
import { ConnectDeviceBody, ConnectDeviceBodyType } from './types'

const Params = Type.Object({
  userId: Type.String({ format: 'uuid' }),
  deviceId: Type.String({ format: 'uuid' }),
})

type ParamsType = Static<typeof Params>

const connectDevice: FastifyPluginAsync = async (
  fastify: FastifyInstance,
): Promise<void> => {
  fastify.put<{
    Body: ConnectDeviceBodyType
    Params: ParamsType
    Reply: GetDeviceResponseType
  }>(
    '/:deviceId',
    {
      schema: {
        body: ConnectDeviceBody,
        params: Params,
        response: {
          200: GetDeviceResponse,
        },
      },
    },
    async request => {
      const { userId: ownerId, deviceId: id } = request.params

      const device = await fastify.prisma.device.findUnique({
        where: {
          id,
        },
      })

      fastify.assert.ok(device, 404, `Device not found with id: ${id}`)

      const { firstName, lastName, responseTime } = request.body

      const updatedDevice = await fastify.prisma.device.update({
        where: {
          id,
        },
        data: {
          bounded: true,
          owner: {
            connect: {
              id: ownerId,
            },
          },
          metadata: {
            update: {
              responseTime,
              caneUser: {
                create: {
                  firstName,
                  lastName,
                },
              },
            },
          },
        },
        include: {
          metadata: {
            include: {
              caneUser: true,
            },
          },
        },
      })

      return {
        ...updatedDevice,
        metadata: {
          ...updatedDevice.metadata,
          createdAt: updatedDevice.metadata.createdAt.toISOString(),
          updatedAt: updatedDevice.metadata.updatedAt.toISOString(),
        },
      }
    },
  )
}

export default connectDevice
