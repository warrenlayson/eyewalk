import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { UserPayload } from '../typings'

const currentUser: RequestHandler = (req, _, next) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_TOKEN!,
    ) as UserPayload

    req.currentUser = payload
  } catch (err) {
    console.error(err)
  }
  return next()
}

export default currentUser
