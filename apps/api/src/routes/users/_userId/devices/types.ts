import { Static, Type } from '@sinclair/typebox'

export const ConnectDeviceBody = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  responseTime: Type.Number(),
})

export type ConnectDeviceBodyType = Static<typeof ConnectDeviceBody>
