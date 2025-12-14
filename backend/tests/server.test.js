const request = require('supertest');

describe('Server basic test', () => {
  it('should respond with 404 for unknown route', async () => {
    const res = await request('http://localhost:5000').get('/unknown');
    expect(res.statusCode).toBe(404);
  });
});
