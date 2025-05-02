const request = require('supertest');
const server = require('../src/server');

describe('API Endpoints', () => {
  afterAll((done) => {
    server.close(done);
  });

  describe('GET /api/data/current', () => {
    it('should return current data with correct structure', async () => {
      const res = await request(server).get('/api/data/current');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('cpu');
      expect(res.body).toHaveProperty('memory');
      expect(res.body).toHaveProperty('network');
      
      expect(typeof res.body.cpu).toBe('number');
      expect(typeof res.body.memory).toBe('number');
      expect(typeof res.body.network).toBe('number');
    });
  });

  describe('GET /api/data/historical', () => {
    it('should return an array of historical data points', async () => {
      const res = await request(server).get('/api/data/historical');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('timestamp');
        expect(res.body[0]).toHaveProperty('cpu');
        expect(res.body[0]).toHaveProperty('memory');
        expect(res.body[0]).toHaveProperty('network');
      }
    });
  });

  describe('Health check', () => {
    it('should return 200 for health check endpoint', async () => {
      const res = await request(server).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'ok');
    });
  });
});
