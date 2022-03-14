import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import exclude from '../lib/exlude'
import prisma from '../prisma'
import { UserPayload } from '../typings'

const currentUser: RequestHandler = async (req, _, next) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_TOKEN!,
    ) as UserPayload

    const user = await prisma.user.findUnique({
      where: {
        id: Number(payload.id),
      },
    })
    if (!user) {
      return next()
    }
    const userWithoutPassword = exclude(user, 'password')
    req.currentUser = userWithoutPassword
  } catch (err) {
    console.error(err)
  }
  return next()
}

export default currentUser
