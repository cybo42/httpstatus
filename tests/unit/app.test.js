'use strict';

const request = require('supertest');
const app = require('../../app');

describe('Unit Tests - Core Functionality', () => {
    describe('HTTP status code routing', () => {
        test('parses the status code from the URL and returns it as the response status', async () => {
            const res = await request(app).get('/code/200');
            expect(res.status).toBe(200);
        });

        test('returns 404 status when 404 is requested', async () => {
            const res = await request(app).get('/code/404');
            expect(res.status).toBe(404);
        });

        test('returns 500 status when 500 is requested', async () => {
            const res = await request(app).get('/code/500');
            expect(res.status).toBe(500);
        });

        test('returns 201 status when 201 is requested', async () => {
            const res = await request(app).get('/code/201');
            expect(res.status).toBe(201);
        });

        test('returns 301 status when 301 is requested', async () => {
            const res = await request(app).get('/code/301');
            expect(res.status).toBe(301);
        });
    });

    describe('JSON response format', () => {
        test('defaults to JSON response when no Accept header is set', async () => {
            const res = await request(app).get('/code/200');
            expect(res.headers['content-type']).toMatch(/application\/json/);
        });

        test('returns JSON body containing the requested code', async () => {
            const res = await request(app).get('/code/200');
            expect(res.body).toEqual({ code: 200 });
        });

        test('returns correct code value in JSON body for 404', async () => {
            const res = await request(app).get('/code/404');
            expect(res.body).toEqual({ code: 404 });
        });

        test('returns JSON when Accept header is application/json', async () => {
            const res = await request(app)
                .get('/code/200')
                .set('Accept', 'application/json');
            expect(res.headers['content-type']).toMatch(/application\/json/);
            expect(res.body).toEqual({ code: 200 });
        });
    });

    describe('XML response format', () => {
        test('returns XML response when Accept header is application/xml', async () => {
            const res = await request(app)
                .get('/code/200')
                .set('Accept', 'application/xml');
            expect(res.headers['content-type']).toMatch(/application\/xml/);
        });

        test('returns well-formed XML body with the requested code', async () => {
            const res = await request(app)
                .get('/code/200')
                .set('Accept', 'application/xml');
            expect(res.text).toBe(
                '<?xml version="1.0" encoding="UTF-8"?>\n<response>\n  <code>200</code>\n</response>'
            );
        });

        test('returns correct code value in XML body for 404', async () => {
            const res = await request(app)
                .get('/code/404')
                .set('Accept', 'application/xml');
            expect(res.text).toContain('<code>404</code>');
        });
    });
});
