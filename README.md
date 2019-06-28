Mini Exchange App 
=======================

A currency exchange web application which uses holts method for predicting future currency rates. The web app supports multi-threading using the **PM2** library in node.js. The application will generate a forecast and display the retrieved information on UI, starting from current week.

Table of Contents
-----------------

- [Features](#features)
- [Prerequisite](#prerequisited)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

Features
--------
- **Forecasting** using holts method.
- **Multi threading** using PM2 Library
- **JOI schema validation** request schema validation using JOI
- **Logging** using Winston Library
- **Testing** using mocha and assert

Prerequisites
-------------

- Install [Python](https://www.python.org/downloads/)
- Install [Node.js LTS](http://nodejs.org)
- Install [Anaconda](https://www.anaconda.com/distribution/)]

Getting Started
---------------

```bash
# Get the latest snapshot
git clone https://github.com/navroze/currency-exchnage-prediction.git

cd currency-exchnage-prediction

# Install NPM dependencies
npm install

# Install global dependencies
npm install -g pm2

# Open anaconda prompt depending upon your operating system

# Go to the root of currency-exchnage-prediction project

# Create virtual environment and install python dependecies
conda env create -f exchange_currency.yml

# Activate the virtual environment from anaconda prompt
conda activate exchange_currency_test

# Then simply start your app
npm start

# To test your application
npm test
```

**Note:** Set the path of *PYTHON_PATH* in the .env file for the web application to run.


Project Structure
-----------------

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **routes**/currency.js             | Controller for handling the currency exchange prediction              |
| **test/**             | Folder for automated testing using mocha              |
| **public/**             | Public files for index.html              |
| **services**/exchange-logic.js             | Logic for connecting to holt.py and receiving the prediction             |
| **schemas**/request-schema.js                 | REST API request validation schema.                          |                       |
| **logging**/currency_logging                 | File to store logs.                          |                       |
| **exchange-logic**/exchange-logic.js                 | Filtering logic to retrieve the company-id for the bid.                          |                       |
| .env                      | Your PATH variables.           |
| .eslintrc                          | Rules for eslint linter.                                     |
| .gitignore                         | Folder and files ignored by git.                             |
| app.js                             | The main application file.                                   |
| package.json                       | NPM dependencies.                                            |
| requirements.txt                  | Python dependencies for machine learning. |