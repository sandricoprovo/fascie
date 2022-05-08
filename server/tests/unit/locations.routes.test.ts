import request from 'supertest';

import server from '../../server';

describe('Location Endpoints Test', () => {
    test('GET /locations ', async () => {
        await request(server)
            .get('/locations')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});
