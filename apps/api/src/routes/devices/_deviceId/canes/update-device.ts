import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'

const Params = Type.Object({
  deviceId: Type.String({
    format: 'uuid',
  }),
})

type ParamsType = Static<typeof Params>

const CaneQuerystring = Type.Object({
  batteryLevel: Type.Optional(Type.Number()),
  latlng: Type.Optional(Type.String()),
  pulse: Type.Optional(Type.Number()),
  x: Type.Optional(Type.Number()),
  y: Type.Optional(Type.Number()),
  z: Type.Optional(Type.Number()),
})

type CaneQuerystringType = Static<typeof CaneQuerystring>
const updateDevice: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.put<{ Querystring: CaneQuerystringType; Params: ParamsType }>(
    '/',
    {
      schema: {
        querystring: CaneQuerystring,
        params: Params,
      },
    },
    async (request, reply) => {
      const { deviceId: id } = request.params

      const device = await fastify.prisma.device.findUnique({
        where: { id },
      })

      fastify.assert.ok(device, 404, `Device not found with id: ${id}`)
      const { latlng, x, y, z, pulse, batteryLevel } = request.query

      const arr = latlng?.split(',')

      const updatedDevice = await fastify.prisma.device.update({
        data: {
          metadata: {
            update: {
              latitude: arr ? parseFloat(arr[0]) : undefined,
              longitude: arr ? parseFloat(arr[1]) : undefined,
              x,
              y,
              z,
              pulse,
              batteryLevel,
            },
          },
        },
        where: {
          id,
        },
        select: {
          metadata: {
            select: {
              responseTime: true,
            },
          },
        },
      })

      reply.code(200).send(updatedDevice.metadata.responseTime)
    },
  )
}

export default updateDevice
