// This file contains code that we reuse between our tests.
import Fastify from 'fastify'
import fp from 'fastify-plugin'
import App from '../src/app'

// Fill in this config with all the configurations
// needed for testing the application
async function config() {
  return {}
}

// Automatically build and tear down our instance
function build() {
  process.env.DATABASE_URL = 'postgres://prisma:prisma@localhost:5433/tests'
  process.env.SESSION_SECRET =
    '017cca79215f5390f8669826783633bc34a825eb6f2e97d646ac40f0aee363ba'
  process.env.REDIS_URL = 'redis://localhost:6379'
  const app = Fastify()

  beforeAll(async () => {
    app.register(fp(App), await config())
    await app.ready()
  })

  afterAll(() => app.close())
  return app
}

export { config, build }
