const request = require('supertest');
const app = require('./app').default;

describe('GET /', () => {
    it('should return healthy', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});
