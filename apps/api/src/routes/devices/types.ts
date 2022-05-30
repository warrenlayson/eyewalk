import { Static, Type } from '@sinclair/typebox'

export const DevicePostBody = Type.Object(
  {
    description: Type.String(),
  },
  { additionalProperties: false },
)

export type DevicePostBodyType = Static<typeof DevicePostBody>

export const DevicePutBody = Type.Object(
  {
    description: Type.Optional(Type.String()),
    bounded: Type.Optional(Type.Boolean()),
    metadata: Type.Optional(
      Type.Object({
        batteryLevel: Type.Optional(Type.Number()),
        longitude: Type.Optional(Type.Number()),
        latitude: Type.Optional(Type.Number()),
        pulse: Type.Optional(Type.Number()),
        responseTime: Type.Optional(Type.Number()),
        x: Type.Optional(Type.Number()),
        y: Type.Optional(Type.Number()),
        z: Type.Optional(Type.Number()),
        baseLongitude: Type.Optional(Type.Number()),
        baseLatitude: Type.Optional(Type.Number()),
        maxDistance: Type.Optional(Type.Number()),
        caneUser: Type.Optional(
          Type.Object({
            firstName: Type.Optional(Type.String()),
            lastName: Type.Optional(Type.String()),
          }),
        ),
      }),
    ),
  },
  { additionalProperties: false },
)

export type DevicePutBodyType = Static<typeof DevicePutBody>

export const CaneUser = Type.Object({
  id: Type.String({
    format: 'uuid',
  }),
  firstName: Type.String(),
  lastName: Type.String(),
  deviceMetadataId: Type.String({ format: 'uuid' }),
})

const DeviceMetadata = Type.Object({
  id: Type.String({
    format: 'uuid',
  }),
  batteryLevel: Type.Number(),
  longitude: Type.Number(),
  latitude: Type.Number(),
  pulse: Type.Number(),
  responseTime: Type.Number(),
  x: Type.Number(),
  y: Type.Number(),
  z: Type.Number(),
  baseLongitude: Type.Number(),
  baseLatitude: Type.Number(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
})

const DeviceMetadataWithCaneUser = Type.Intersect([
  DeviceMetadata,
  Type.Object({
    caneUser: CaneUser,
  }),
])

export const Device = Type.Object({
  id: Type.String({
    format: 'uuid',
  }),
  description: Type.String(),
  bounded: Type.Boolean(),
  ownerId: Type.Union([Type.String({ format: 'uuid' }), Type.Null()]),
  deviceMetadataId: Type.String({ format: 'uuid' }),
})

export const DeviceWithMetadata = Type.Intersect([
  Device,
  Type.Object({
    metadata: DeviceMetadata,
  }),
])

export const DeviceWithMetadataWithCaneUser = Type.Intersect([
  DeviceWithMetadata,
  Type.Object({
    metadata: DeviceMetadataWithCaneUser,
  }),
])

export type DeviceWithMetadataWithCaneUserType = Static<
  typeof DeviceWithMetadataWithCaneUser
>

export const GetDeviceResponse = Type.Union([
  DeviceWithMetadataWithCaneUser,
  DeviceWithMetadata,
])

export type GetDeviceResponseType = Static<typeof GetDeviceResponse>

export const GetDevicesResponse = Type.Array(GetDeviceResponse)
export type GetDevicesResponseType = Static<typeof GetDevicesResponse>
