const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('Stock Controller', () => {
  it('GET to /currency?baseCurrency=USD&targetCurrency=EUR&amount=3000 should return 302 status if request parameters are bad', (done) => {
    request(app)
      .get('/currency?baseCurrency=USD&targetCurrency=EUR&amount=3000')
      .expect('Content-Type', /json/)
      .expect(302, done);
  }).timeout(50000);

  it('GET to /currency?amount=1&baseCurrency=CAD&targetCurrency=CAD&waitingTime=2 should return 302 status if target currency and base currency are same', async () => {
    await request(app)
      .get('/currency?amount=1&baseCurrency=CAD&targetCurrency=CAD&waitingTime=2')
      .expect(302)
      .then((response) => {
        const parsedResponse = response.body;
        assert(parsedResponse.message === 'Base currency and Target currency should not be equal');
      });
  }).timeout(50000);

  it('GET to /currency?amount=1&baseCurrency=CAD&targetCurrency=AUD&waitingTime=2 should return 200 status', async () => {
    await request(app)
      .get('/currency?amount=1&baseCurrency=CAD&targetCurrency=AUD&waitingTime=2')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        assert('date' in body && 'rate' in body);
        assert(body.date !== undefined && body.rate !== undefined);
        assert(body.date !== null && body.rate !== null);
      })
      .catch(error => console.log(error));
  }).timeout(50000);
});
