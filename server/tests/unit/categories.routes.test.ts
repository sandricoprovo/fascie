import request from 'supertest';

import server from '../../server';

describe('Category Endpoints Test', () => {
    test('GET /categories ', async () => {
        await request(server)
            .get('/categories')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});
