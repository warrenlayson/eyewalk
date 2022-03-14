import cookieSession from 'cookie-session'
import cors from 'cors'
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv-safe'
import express from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import NotFoundError from './errors/not-found-error'
import errorHandler from './middlewares/error-handler'
import auth from './routes/auth'

dotenv.config({
  path:
    // eslint-disable-next-line no-nested-ternary
    process.env.NODE_ENV === 'test' ? './.env.test' : './.env',
})

const app = express()

app.use(express.json())
app.use(
  cors({
    credentials: true,
  }),
)
app.use(helmet())
app.use(
  cookieSession({
    signed: false,
    secure: false,
  }),
)

app.get('/api', (_, res) => {
  res.send({ message: 'Welcome to api!' })
})

app.use('/api/auth', auth)

app.get('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export default app
