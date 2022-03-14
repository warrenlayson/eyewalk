import { User } from '@prisma/client'
import 'cookie-session'

declare module 'cookie-session' {
  interface SessionData {
    jwt?: string
  }
}

export interface UserPayload {
  id: string
  email: string
}

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: Omit<User, 'password'>
  }
}
