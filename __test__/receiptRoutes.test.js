const request = require('supertest');
const app = require('../src/app');

describe('GET /receipts/:id/points', () => {

    let server;
    let receiptId;

    beforeAll((done) => {
      server = app.listen(3000, done);
    });

    beforeAll(async () => {
        const receiptData = {
          "retailer": "Target",
          "purchaseDate": "2022-01-01",
          "purchaseTime": "13:01",
          "items": [
            {
              "shortDescription": "Mountain Dew 12PK",
              "price": "6.49"
            },
            {
              "shortDescription": "Emils Cheese Pizza",
              "price": "12.25"
            }
          ],
          "total": "35.35"
        };

        const response = await request(app)
        .post('/receipts/process')
        .send(receiptData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        receiptId = response.body.id;
    });

    afterAll((done) => {
      server.close(done); // Close the server after all tests
    });
    
    it('successfully retrieves points for a processed receipt', async () => {
        const response = await request(app)
          .get(`/receipts/${receiptId}/points`);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('points');
        expect(typeof response.body.points).toBe('number'); // Check if points is a number
    });

    it('returns 404 for a non-exist ID', async () => {
        const fakeId = 'non-exist-id';
        const response = await request(app)
          .get(`/receipts/${fakeId}/points`);
    
        expect(response.statusCode).toBe(404);
      });
 
});