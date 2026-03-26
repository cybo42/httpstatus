'use strict';

const request = require('supertest');
const app = require('../../app');

describe('HTTP Endpoint Tests - GET /code/:code', () => {
    describe('2xx Success codes', () => {
        test('GET /code/200 returns 200 OK with JSON', async () => {
            const res = await request(app)
                .get('/code/200')
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.headers['content-type']).toMatch(/application\/json/);
            expect(res.body).toEqual({ code: 200 });
        });

        test('GET /code/201 returns 201 Created with JSON', async () => {
            const res = await request(app)
                .get('/code/201')
                .set('Accept', 'application/json');
            expect(res.status).toBe(201);
            expect(res.body).toEqual({ code: 201 });
        });

        test('GET /code/204 returns 204 No Content', async () => {
            const res = await request(app)
                .get('/code/204')
                .set('Accept', 'application/json');
            expect(res.status).toBe(204);
        });
    });

    describe('3xx Redirection codes', () => {
        test('GET /code/301 returns 301 with JSON', async () => {
            const res = await request(app)
                .get('/code/301')
                .set('Accept', 'application/json')
                .redirects(0);
            expect(res.status).toBe(301);
            expect(res.body).toEqual({ code: 301 });
        });

        test('GET /code/302 returns 302 with JSON', async () => {
            const res = await request(app)
                .get('/code/302')
                .set('Accept', 'application/json')
                .redirects(0);
            expect(res.status).toBe(302);
            expect(res.body).toEqual({ code: 302 });
        });
    });

    describe('4xx Client error codes', () => {
        test('GET /code/400 returns 400 Bad Request with JSON', async () => {
            const res = await request(app)
                .get('/code/400')
                .set('Accept', 'application/json');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ code: 400 });
        });

        test('GET /code/401 returns 401 Unauthorized with JSON', async () => {
            const res = await request(app)
                .get('/code/401')
                .set('Accept', 'application/json');
            expect(res.status).toBe(401);
            expect(res.body).toEqual({ code: 401 });
        });

        test('GET /code/403 returns 403 Forbidden with JSON', async () => {
            const res = await request(app)
                .get('/code/403')
                .set('Accept', 'application/json');
            expect(res.status).toBe(403);
            expect(res.body).toEqual({ code: 403 });
        });

        test('GET /code/404 returns 404 Not Found with JSON', async () => {
            const res = await request(app)
                .get('/code/404')
                .set('Accept', 'application/json');
            expect(res.status).toBe(404);
            expect(res.body).toEqual({ code: 404 });
        });

        test('GET /code/422 returns 422 Unprocessable Entity with JSON', async () => {
            const res = await request(app)
                .get('/code/422')
                .set('Accept', 'application/json');
            expect(res.status).toBe(422);
            expect(res.body).toEqual({ code: 422 });
        });

        test('GET /code/429 returns 429 Too Many Requests with JSON', async () => {
            const res = await request(app)
                .get('/code/429')
                .set('Accept', 'application/json');
            expect(res.status).toBe(429);
            expect(res.body).toEqual({ code: 429 });
        });
    });

    describe('5xx Server error codes', () => {
        test('GET /code/500 returns 500 Internal Server Error with JSON', async () => {
            const res = await request(app)
                .get('/code/500')
                .set('Accept', 'application/json');
            expect(res.status).toBe(500);
            expect(res.body).toEqual({ code: 500 });
        });

        test('GET /code/502 returns 502 Bad Gateway with JSON', async () => {
            const res = await request(app)
                .get('/code/502')
                .set('Accept', 'application/json');
            expect(res.status).toBe(502);
            expect(res.body).toEqual({ code: 502 });
        });

        test('GET /code/503 returns 503 Service Unavailable with JSON', async () => {
            const res = await request(app)
                .get('/code/503')
                .set('Accept', 'application/json');
            expect(res.status).toBe(503);
            expect(res.body).toEqual({ code: 503 });
        });
    });

    describe('XML responses', () => {
        test('GET /code/200 returns XML when Accept: application/xml', async () => {
            const res = await request(app)
                .get('/code/200')
                .set('Accept', 'application/xml');
            expect(res.status).toBe(200);
            expect(res.headers['content-type']).toMatch(/application\/xml/);
            expect(res.text).toBe(
                '<?xml version="1.0" encoding="UTF-8"?>\n<response>\n  <code>200</code>\n</response>'
            );
        });

        test('GET /code/404 returns XML when Accept: application/xml', async () => {
            const res = await request(app)
                .get('/code/404')
                .set('Accept', 'application/xml');
            expect(res.status).toBe(404);
            expect(res.headers['content-type']).toMatch(/application\/xml/);
            expect(res.text).toContain('<code>404</code>');
        });

        test('GET /code/500 returns XML when Accept: application/xml', async () => {
            const res = await request(app)
                .get('/code/500')
                .set('Accept', 'application/xml');
            expect(res.status).toBe(500);
            expect(res.headers['content-type']).toMatch(/application\/xml/);
            expect(res.text).toContain('<code>500</code>');
        });

        test('XML response includes XML declaration', async () => {
            const res = await request(app)
                .get('/code/200')
                .set('Accept', 'application/xml');
            expect(res.text).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
        });

        test('XML response wraps code in <response> element', async () => {
            const res = await request(app)
                .get('/code/200')
                .set('Accept', 'application/xml');
            expect(res.text).toMatch(/<response>[\s\S]*<\/response>/);
        });
    });

    describe('Content negotiation', () => {
        test('defaults to JSON when Accept header is not set', async () => {
            const res = await request(app).get('/code/200');
            expect(res.headers['content-type']).toMatch(/application\/json/);
        });

        test('defaults to JSON when Accept header is */*', async () => {
            const res = await request(app)
                .get('/code/200')
                .set('Accept', '*/*');
            expect(res.headers['content-type']).toMatch(/application\/json/);
        });

        test('returns XML when Accept includes application/xml among other types', async () => {
            const res = await request(app)
                .get('/code/200')
                .set('Accept', 'text/html,application/xml,*/*');
            expect(res.headers['content-type']).toMatch(/application\/xml/);
        });
    });
});
