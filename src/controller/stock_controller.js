"use strict";

const urlParams = new URLSearchParams(window.location.search);
let companyData = {
  symbol: urlParams.get("symbol"),
  name: urlParams.get("name"),
};

const stocks = getStockValue(companyData.symbol);

document.title = companyData.symbol + " - " + companyData.name;
stockView.title.innerHTML = companyData.symbol + " - " + companyData.name;

stocks.then(function (data) {
  let timeSeries = data["Time Series (5min)"];
  let lastRefreshed = data["Meta Data"]["3. Last Refreshed"];

  stockView.price[0].innerHTML = timeSeries[lastRefreshed]["4. close"];
});
