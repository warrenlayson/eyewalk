import request from 'supertest'
import app from '../app'

describe('GET /api', () => {
  // eslint-disable-next-line jest/expect-expect
  test('should return 200', async () => request(app).get('/api').expect(200))
})
