const { spawn } = require('child_process');
const moment = require('moment');
// const winston = require('winston');

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.File({ filename: './exchange-logs/exchange.log' })
//   ]
// });
// logger.log({
//   level: 'info',
//   message: 'No Companies Passed from Targeting'
// });
const exchangeLogic = {};

/**
 * Node wrapper for parsing request params to python model and getting forecast ExchangeDate
 */
exchangeLogic.getBestExchangeDate = (query, callback) => {
  const startDate = moment().subtract(query.waitingTime, 'weeks').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');

  const pythonPath = 'N:\\Codes\\Node\\currency\\test.py';
  const args = [
    pythonPath,
    query.baseCurrency,
    query.targetCurrency,
    startDate,
    endDate,
    query.waitingTime
  ];
  const pythonProcess = spawn('python', args);
  pythonProcess.stdout.on('data', (data) => {
    // Do something with the data returned from python script
    const result = JSON.parse(data.toString());
    if ('error' in result) {
      const error = {
        name: 'Predication error',
        message: 'Something went wrong during prediction',
        _object: {
          amount: query.amount,
          baseCurrency: query.baseCurrency,
          targetCurrency: query.targetCurrency,
          waitingTime: query.waitingTime
        }
      };
      return callback(error);
    }
    result.rate = result.rate.toFixed(4);
    return callback(null, result);
  });
};

module.exports = exchangeLogic;
