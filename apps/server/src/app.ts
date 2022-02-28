import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieSession from 'cookie-session'
import auth from './routes/auth'
import NotFoundError from './errors/not-found-error'
import errorHandler from './middlewares/error-handler'

const app = express()


app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
)

app.get('/api', (_, res) => {
  res.send({ message: 'Welcome to api!'})
})

app.use('/api/auth', auth)

app.get('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export default app
