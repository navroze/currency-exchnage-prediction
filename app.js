/**
 * Module dependencies.
 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const path = require('path');
const routes = require('./routes');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('host', process.env.SERVER_IP || '0.0.0.0');
app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Register main route.
 */
app.use('/', routes);

app.get('/', (req, res) => {
  try {
    res.sendFile('views/index.html', { root: __dirname });
  } catch (error) {
    console.log('Failed to retrieve data from / path: ', error);
  }
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d', chalk.green('✓'), app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
