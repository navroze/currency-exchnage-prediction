require('dotenv').config();
const { spawn } = require('child_process');
const moment = require('moment');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: './logging/currency_logging' })
  ]
});
const exchangeLogic = {};

/**
 * Node wrapper for parsing request params to python model and getting forecast ExchangeDate
 */
exchangeLogic.getBestExchangeDate = (query, callback) => {
  logger.log({
    level: 'info',
    message: {
      info: 'requestData from client',
      query
    }
  });

  const startDate = moment().subtract(query.waitingTime, 'weeks').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');

  const pythonPath = process.env.PYTHON_PATH;
  const args = [
    pythonPath,
    query.baseCurrency,
    query.targetCurrency,
    startDate,
    endDate,
    query.waitingTime
  ];
  const pythonProcess = spawn('python', args);

  /**
 * Connect to python script and use holts method for forecasting rates.
 */
  pythonProcess.stdout.on('data', (data) => {
    // Do something with the data returned from python script
    const result = JSON.parse(data.toString());

    // Check if error found in python script
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
    logger.log({
      level: 'info',
      message: {
        info: 'Holts model prediction',
        prediction: result
      }
    });

    return callback(null, result);
  });
};

module.exports = exchangeLogic;
