const config = require('../config/config.json');

describe('Fetch market status', function () {
    it('should return a 200 status code', function () {
        fetch("https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=" + config.key,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                return response.json();
            })
            .then(json => console.log(json));
    });
});