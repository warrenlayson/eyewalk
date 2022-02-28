import request from 'supertest'
import app from '../app'

describe('GET /api', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/api')

    expect(response.statusCode).toEqual(200)
  })
})
