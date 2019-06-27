/* eslint linebreak-style: ["error", "windows"] */
const routes = require('express').Router();
const Joi = require('@hapi/joi');
const { currecyQueryStringSchema } = require('../schemas/request-schema');
const { getBestExchangeDate } = require('../services/exchange-logic');

/**
* @api {get} /currency Get currency exchange prediction from python
* @apiName Get prediction
*
* @apiParam  {String} [baseCurrency] basecurrency
* @apiParam  {String} [targetCurrency] targetcurrency
* @apiParam  {String} [amount] amount
* @apiParam  {String} [waitingTime] waitingtime
*
* @apiSuccess (200) {Object} mixed `currency` object
*/

routes.get('/currency', async (req, res) => {
  try {
    const { query } = req;
    const { error } = Joi.validate(query, currecyQueryStringSchema);

    // Custom validation for base and target currency
    if (query.baseCurrency === query.targetCurrency) {
      res.statusCode = 302;
      const response = {
        name: 'ValidationError',
        message: 'Base currency and Target currency should not be equal',
        _object: {
          amount: query.amount,
          baseCurrency: query.baseCurrency,
          targetCurrency: query.targetCurrency,
          waitingTime: query.waitingTime
        }
      };
      res.json(response);
      return;
    }

    // Joi validation for request params
    if (!error) {
      getBestExchangeDate(query, (err, response) => {
        if (err) throw err;
        res.send(response);
      });
    } else {
      throw error;
    }
  } catch (err) {
    res.statusCode = 302;
    res.json(err);
  }
});

module.exports = routes;
