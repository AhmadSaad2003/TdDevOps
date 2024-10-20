// src/api.spec.ts
import http from 'http';
import request from 'supertest';
import { requestHandler } from './index'; // Adjust to reflect the correct path

describe('API Tests', () => {
    let server: http.Server;
    const PORT = 8000; // Change to an available port

    beforeAll((done) => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        // Create and start the server using the requestHandler
        server = http.createServer(requestHandler);
        server.listen(PORT, done); // Start the server
    }, 10000); // Increase timeout to 10 seconds

    afterAll(() => {
        // Close the server after all tests are done
        server.close();
    });

    it('should return 200 on GET /api/v1/sysinfo', async () => {
        const response = await request(server).get('/api/v1/sysinfo');
        expect(response.status).toBe(200);
    });

    it('should return 404 on unknown route', async () => {
        const response = await request(server).get('/unknown');
        expect(response.status).toBe(404);
    });
});
