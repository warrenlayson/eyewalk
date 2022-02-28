/* eslint-disable jest/expect-expect */
import request from 'supertest'
import app from '../../app'
import prisma from '../../prisma'

afterEach(async () => {
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Register route', () => {
  test('should return a 201 on successful register', async () =>
    request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Warren',
        lastName: 'Layson',
        email: 'test1@test.com',
        password: 'password',
      })
      .expect(201))

  test('should return a 400 with an invalid email', async () =>
    request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Warren',
        lastName: 'Layson',
        email: 'test1@test',
        password: 'password',
      })
      .expect(400))

  test('should return a 400 with an  invalid password', async () =>
    request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Warren',
        lastName: 'Layson',
        email: 'test1@test.com',
        password: 'aaa',
      })
      .expect(400))

  test('should return a 400 with missing first name, last name, email, and password', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        lastName: 'Layson',
        email: 'test1@test.com',
        password: 'aaa',
      })
      .expect(400)
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Warren',
        email: 'test1@test.com',
        password: 'aaa',
      })
      .expect(400)
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Warren',
        lastName: 'Layson',
        password: 'aaaaaa',
      })
      .expect(400)
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Warren',
        lastName: 'Layson',
        email: 'test1@test.com',
      })
      .expect(400)
  })
})

describe('Login route', () => {
  test('should return 200 when user attempts to login', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Warren',
        lastName: 'Layson',
        email: 'test1@test.com',
        password: 'password',
      })
      .expect(201)

    await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test1@test.com',
        password: 'password',
      })
      .expect(200)
  })

  test('should return 401 with invalid credentials', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Warren',
        lastName: 'Layson',
        email: 'test1@test.com',
        password: 'password',
      })
      .expect(201)

    await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(401)

    await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test1@test.com',
        password: 'passwors',
      })
      .expect(401)
  })
})
