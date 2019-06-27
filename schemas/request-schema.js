/* eslint linebreak-style: ["error", "windows"] */
const Joi = require('@hapi/joi');

const currecyQueryStringSchema = Joi.object().keys({
  baseCurrency: Joi.string().required().valid('AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR',
    'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'),
  targetCurrency: Joi.string().required().valid('AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR',
    'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'),
  amount: Joi.number().integer().required().min(1),
  waitingTime: Joi.number().integer().required().min(1)
    .max(250)
});

module.exports.currecyQueryStringSchema = currecyQueryStringSchema;
