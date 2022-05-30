import { Role } from '@prisma/client'
import { Static, Type } from '@sinclair/typebox'

export const User = Type.Object(
  {
    id: Type.String({
      description: 'The user id',
      format: 'uuid',
    }),
    email: Type.String({
      description: 'The user email',
      format: 'email',
    }),
    role: Type.Enum(Role),
    password: Type.String({
      description: 'The user password',
    }),
    firstName: Type.String({ minLength: 1, maxLength: 70 }),
    lastName: Type.String({ minLength: 1, maxLength: 70 }),
  },
  { additionalProperties: false },
)
export type UserType = Static<typeof User>

export const UserNoPassword = Type.Omit(User, ['password'])

export type UserWithoutPasswordType = Static<typeof UserNoPassword>

export const GetUsers = Type.Array(UserNoPassword)

export type GetUsersType = Static<typeof GetUsers>
