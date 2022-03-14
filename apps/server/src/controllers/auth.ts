import { hash, verify } from 'argon2'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import BadRequestError from '../errors/bad-request-error'
import NotAuthorizedError from '../errors/not-authorized-error'
import exclude from '../lib/exlude'
import prisma from '../prisma'

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw new NotAuthorizedError()
  }

  const isMatch = await verify(user.password, password)

  if (!isMatch) {
    throw new NotAuthorizedError()
  }

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_TOKEN!,
  )

  req.session = {
    jwt: userJwt,
  }
  const userWithoutPassword = exclude(user, 'password')

  res.send(userWithoutPassword)
}

const register: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new BadRequestError('Email in use')
  }

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: await hash(password),
    },
  })

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_TOKEN!,
  )

  req.session = {
    jwt: userJwt,
  }

  const userWithoutPassword = exclude(user, 'password')

  res.status(201).send(userWithoutPassword)
}

const logout: RequestHandler = (req, res) => {
  req.session = null
  res.send({})
}

const me: RequestHandler = (req, res) => {
  res.send(req.currentUser)
}

export { login, register, logout, me }
