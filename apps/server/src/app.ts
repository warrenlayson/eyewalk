import express from 'express'

const app = express()

app.get('/api', (_, res) => {
  res.send('Hello world')
})

export { app }
