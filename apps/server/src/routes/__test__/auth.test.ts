import request from 'supertest'
import app from '../../app'
import prisma from '../../prisma'

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany()

  await prisma.$transaction([deleteUsers])

  await prisma.$disconnect()
})

describe('Register route', () => {
  test('should return a 201 on successful register', async () => {
    const response = await request(app).post('/api/auth/register').send({
      firstName: 'Warren',
      lastName: 'Layson',
      email: 'test1@test.com',
      password: 'password',
    })

    expect(response.statusCode).toEqual(201)
  })

  test('should return a 400 with an invalid email', async () => {
    const response = await request(app).post('/api/auth/register').send({
      firstName: 'Warren',
      lastName: 'Layson',
      email: 'test1@test',
      password: 'password',
    })

    expect(response.statusCode).toEqual(400)
  })

  test('should return a 400 with an  invalid password', async () => {
    const response = await request(app).post('/api/auth/register').send({
      firstName: 'Warren',
      lastName: 'Layson',
      email: 'test1@test.com',
      password: 'aaa',
    })
    expect(response.statusCode).toEqual(400)
  })

  test('should return a 400 with missing first name, last name, email, and password', async () => {
    let response = await request(app).post('/api/auth/register').send({
      lastName: 'Layson',
      email: 'test1@test.com',
      password: 'aaa',
    })

    expect(response.statusCode).toEqual(400)
    response = await request(app).post('/api/auth/register').send({
      firstName: 'Warren',
      email: 'test1@test.com',
      password: 'aaa',
    })
    expect(response.statusCode).toEqual(400)
    response = await request(app).post('/api/auth/register').send({
      firstName: 'Warren',
      lastName: 'Layson',
      password: 'aaaaaa',
    })
    expect(response.statusCode).toEqual(400)
    response = await request(app).post('/api/auth/register').send({
      firstName: 'Warren',
      lastName: 'Layson',
      email: 'test1@test.com',
    })
    expect(response.statusCode).toEqual(400)
  })
})
