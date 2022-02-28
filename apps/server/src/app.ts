import cookieSession from 'cookie-session'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import NotFoundError from './errors/not-found-error'
import errorHandler from './middlewares/error-handler'
import auth from './routes/auth'

const app = express()

app.use(express.json())
app.use(cors())
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
