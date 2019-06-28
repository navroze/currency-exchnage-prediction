/* eslint linebreak-style: ["error", "windows"] */
const assert = require('assert');
const moment = require('moment');
require('../app');
const { promisify } = require('util');
const { getBestExchangeDate } = require('../services/exchange-logic');

const gbed = promisify(getBestExchangeDate);


describe('Currency Exchange Logic', async () => {
  it('Sucessfully receive the predication using holts method', (done) => {
    const query = {
      amount: '1',
      baseCurrency: 'AUD',
      targetCurrency: 'BRL',
      waitingTime: '2'
    };

    gbed(query)
      .then((response) => {
        assert('date' in response && 'rate' in response);
        done();
      })
      .catch((error) => {
        console.log(error);
        assert(false);
        done();
      });
  }).timeout(50000);

  it('Throw an error if error is found in python logic', (done) => {
    const query = {};
    const gbed = promisify(getBestExchangeDate);

    gbed(query)
      .then((response) => {
        console.log('Should not receive response', response);
        assert(false);
        done();
      })
      .catch((error) => {
        assert(error.name === 'Predication error');
        done();
      });
  }).timeout(50000);

  it('Check if rate is greater than 0', (done) => {
    const query = {
      amount: '1',
      baseCurrency: 'AUD',
      targetCurrency: 'BRL',
      waitingTime: '2'
    };
    const gbed = promisify(getBestExchangeDate);

    gbed(query)
      .then(({ date, rate }) => {
        const momentDate = moment(date);
        rate = parseFloat(rate);
        assert(momentDate.isValid() && rate > 0);
        done();
      })
      .catch((error) => {
        assert(false);
        console.log(error);
        done();
      });
  }).timeout(50000);
});
