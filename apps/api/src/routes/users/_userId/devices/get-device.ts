import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'

const Params = Type.Object({
  userId: Type.String({ format: 'uuid' }),
  deviceId: Type.String({ format: 'uuid' }),
})

type ParamsType = Static<typeof Params>
const getDevice: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: ParamsType
  }>(
    '/:deviceId',
    {
      schema: {
        params: Params,
      },
    },
    async request => {
      const { userId, deviceId } = request.params

      const device = await fastify.prisma.device.findFirst({
        where: {
          AND: {
            id: deviceId,
            ownerId: userId,
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

      fastify.assert.ok(device, 404, 'Device not found')
      return device
    },
  )
}

export default getDevice
