import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { DevicePutBody, DevicePutBodyType } from './types'

const Params = Type.Object({
  id: Type.String({
    format: 'uuid',
  }),
})

type ParamsType = Static<typeof Params>

const updateDevice: FastifyPluginAsync = async (
  fastify: FastifyInstance,
): Promise<void> => {
  fastify.put<{
    Params: ParamsType
    Body: DevicePutBodyType
  }>(
    '/:id',
    {
      schema: {
        params: Params,
        body: DevicePutBody,
      },
    },
    async request => {
      const { id } = request.params

      const device = await fastify.prisma.device.findUnique({
        where: { id },
      })

      fastify.assert.ok(device, 404, `Device not found with id: ${id}`)

      const { metadata, bounded, description } = request.body

      const updatedDevice = await fastify.prisma.device.update({
        where: { id },
        data: {
          bounded,
          description,
          metadata: {
            update: metadata,
          },
        },
        include: {
          metadata: true,
        },
      })
      return updatedDevice
    },
  )
}

export default updateDevice
