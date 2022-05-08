import request from 'supertest';

import { Business } from '../../types/businesses';
import server from '../../server';

describe('Business Endpoints Test', () => {
    test('GET /businesses ', async () => {
        await request(server)
            .get('/businesses')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => Array.isArray(res.body));
    });
    test('GET /business ', async () => {
        const testBusinessId = 1;
        await request(server)
            .get(`/businesses/${testBusinessId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                const payload = (res.body as { business: Business }).business;
                payload.id = testBusinessId;
            });
    });
});
