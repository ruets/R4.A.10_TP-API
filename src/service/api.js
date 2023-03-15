"use strict";

const config = "../../config/config.json";

/**
 * Fetch a symbol from Alphadvantage API returns a Stock object
 *
 * @param ticker    Stock ticker
 *
 * @returns         A stock object
 */
const retriveStock = async function (ticker) {
  let stock = await fetch(
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
      ticker +
      "&apikey=" +
      config.key
  );

  return stock.json();
  /*
   *  {
   *      'Global Quote': {
   *          '01. symbol': 'GOOG',
   *          '02. open': '94.4050',
   *          '03. high': '96.2400',
   *          '04. low': '94.4050',
   *          '05. price': '94.6500',
   *          '06. volume': '25395200',
   *          '07. latest trading day': '2023-03-08',
   *          '08. previous close': '94.1700',
   *          '09. change': '0.4800',
   *          '10. change percent': '0.5097%'
   *      }
   *  }
   */
};

/**
 * Performs a research on API based on a string.
 *
 * @param search      The search
 *
 * @returns           A list of corresponding stocks names
 */
const searchStock = async function (search) {
  let stocks = await fetch(
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
      search +
      "&apikey=" +
      config.key
  );

  return stocks.json();

  /*
   *  Forme du résultat :
   *  {
   *      bestMatches: [
   *          {
   *              '1. symbol': 'AMZN',
   *              '2. name': 'Amazon.com Inc',
   *              '3. type': 'Equity',
   *              '4. region': 'United States',
   *              '5. marketOpen': '09:30',
   *              '6. marketClose': '16:00',
   *              '7. timezone': 'UTC-04',
   *              '8. currency': 'USD',
   *              '9. matchScore': '0.8000'
   *          },
   *          {
   *              '1. symbol': 'GOOG',
   *              '2. name': 'Alphabet Inc - Class C',
   *              '3. type': 'Equity',
   *              '4. region': 'United States',
   *              '5. marketOpen': '09:30',
   *              '6. marketClose': '16:00',
   *              '7. timezone': 'UTC-04',
   *              '8. currency': 'USD',
   *              '9. matchScore': '1.0000'
   *          },
   *      ]
   *  }
   */
};

const getStockValue = async function (stock) {
  let values = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
      stock +
      "&interval=5min&apikey=" +
      config.key
  );

  return values.json();
};
