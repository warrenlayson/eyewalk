import { Role } from '@prisma/client'
import { Static, Type } from '@sinclair/typebox'

export const User = Type.Object(
  {
    id: Type.Number({
      description: 'The user id',
    }),
    email: Type.String({
      description: 'The user email',
      format: 'email',
    }),
    role: Type.Enum(Role),
    password: Type.String({
      description: 'The user password',
    }),
  },
  { additionalProperties: false },
)
export type UserType = Static<typeof User>

export const UserNoPassword = Type.Omit(User, ['password'])

export type UserWithoutPasswordType = Static<typeof UserNoPassword>
