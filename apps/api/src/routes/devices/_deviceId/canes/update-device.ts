/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-continue */
import { Static, Type } from '@sinclair/typebox'
import {
  Expo,
  ExpoPushErrorTicket,
  ExpoPushMessage,
  ExpoPushTicket,
} from 'expo-server-sdk'
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
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }

  function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371e3 // metres
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
  }
  fastify.decorate('getDistance', getDistanceFromLatLonInKm)
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
        include: {
          owner: true,
          metadata: {
            include: {
              caneUser: true,
            },
          },
        },
      })
      const expo = new Expo()
      const pushTokens = updatedDevice.owner?.pushToken?.split(', ') ?? []
      const messages: ExpoPushMessage[] = []
      const caneUser = updatedDevice.metadata?.caneUser

      const lat1 = updatedDevice.metadata?.latitude ?? 0
      const lng1 = updatedDevice.metadata?.longitude ?? 0
      const lat2 = updatedDevice.metadata?.baseLatitude ?? 0
      const lng2 = updatedDevice.metadata?.baseLongitude ?? 0
      const distance = fastify.getDistance(lat1, lng1, lat2, lng2)

      pushTokens.filter(Expo.isExpoPushToken).forEach(pushToken => {
        // check pulse rate and gyro then push to expo token
        if (pulse && pulse > 120) {
          // Construct a message body
          messages.push({
            to: pushToken,
            sound: 'default',
            body: `${caneUser?.firstName} ${caneUser?.lastName} is having a hard time breathing with a bpm of ${pulse}.`,
            title: 'Cane Alert',
          })
        }

        // check system stability
        if (x) {
          if (x > 10) {
            messages.push({
              to: pushToken,
              sound: 'default',
              body: `${caneUser?.firstName} ${caneUser?.lastName}'s cane fell down`,
              title: 'Cane Alert',
            })
          }
        }

        if (distance > updatedDevice.metadata?.maxDistance) {
          messages.push({
            to: pushToken,
            sound: 'default',
            body: `${caneUser?.firstName} ${caneUser?.lastName} is too far away from their base`,
            title: 'Cane Alert',
          })
        }
      })

      if (messages.length > 0) {
        const chunks = expo.chunkPushNotifications(messages)
        const tix: ExpoPushTicket[] | ExpoPushErrorTicket = []

        ;(async () => {
          chunks.forEach(async chunk => {
            try {
              const tixChunk = await expo.sendPushNotificationsAsync(chunk)
              fastify.log.info(tixChunk)
              tix.push(...tixChunk)
            } catch (error) {
              fastify.log.error(error)
            }
          })
        })()

        const receiptIds: string[] = []
        tix.forEach(ticket => {
          if (ticket.status === 'ok') {
            receiptIds.push(ticket.id)
          }
        })

        const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds)

        ;(async () => {
          receiptIdChunks.forEach(async receiptIdChunk => {
            try {
              const receipts = await expo.getPushNotificationReceiptsAsync(
                receiptIdChunk,
              )
              for (const receiptId in receipts) {
                const something = receipts[receiptId]
                if (something.status === 'ok') {
                  continue
                } else if (something.status === 'error') {
                  fastify.log.error(
                    `There was an error sending a notification: ${something.message}`,
                  )

                  if (something.details && something.details.error) {
                    fastify.log.error(
                      `The error code si ${something.details.error}`,
                    )
                  }
                }
              }
            } catch (error) {
              fastify.log.error(error)
            }
          })
        })()
      }

      reply.code(200).send(updatedDevice.metadata.responseTime)
    },
  )
}

export default updateDevice

declare module 'fastify' {
  interface FastifyInstance {
    getDistance: (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number,
    ) => number
  }
}
