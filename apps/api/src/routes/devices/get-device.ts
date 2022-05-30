import { Static, Type } from '@sinclair/typebox'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { GetDeviceResponse, GetDeviceResponseType } from './types'

const Params = Type.Object({
  id: Type.String({
    format: 'uuid',
  }),
})

type ParamsType = Static<typeof Params>

const getDevice: FastifyPluginAsync = async (
  fastify: FastifyInstance,
): Promise<void> => {
  fastify.get<{
    Reply: GetDeviceResponseType
    Params: ParamsType
  }>(
    '/:id',
    {
      schema: {
        response: {
          200: GetDeviceResponse,
        },
        params: Params,
      },
    },
    async request => {
      const { id } = request.params
      const device = await fastify.prisma.device.findUnique({
        where: { id },
        include: {
          metadata: true,
        },
      })

      fastify.assert.ok(device, 404, `Device not found with id: ${id}`)

      return {
        ...device,
        metadata: {
          ...device.metadata,
          createdAt: device.metadata.createdAt.toISOString(),
          updatedAt: device.metadata.updatedAt.toISOString(),
        },
      }
    },
  )
}
export default getDevice
