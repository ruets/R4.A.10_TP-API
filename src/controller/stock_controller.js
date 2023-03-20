"use strict";

const urlParams = new URLSearchParams(window.location.search);
let companyData = {
  symbol: urlParams.get("symbol"),
  name: urlParams.get("name"),
};

const stocks = getStockValue(companyData.symbol);
console.log(stocks);

document.title = companyData.symbol + " - " + companyData.name;
stockView.title.innerHTML = companyData.symbol + " - " + companyData.name;

stocks.then(function (data) {
  let timeSeries = data["Time Series (Daily)"];
  let lastRefreshed = data["Meta Data"]["3. Last Refreshed"];

  stockView.price[0].innerHTML =
    "<span style='color: rgb(26, 188, 156)'>Last close price : </span>" +
    timeSeries[lastRefreshed]["4. close"] +
    " USD";

  console.log(timeSeries["2023-03-15 16:00:00"]);
  let keys = Object.keys(timeSeries);
  let dates = [];
  let prices = [];
  for (let i = keys.length - 1; i >= 0; i--) {
    dates.push(keys[i]);
    prices.push(timeSeries[keys[i]]["4. close"]);

    let date = keys[keys.length - i - 1];

    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="values-date">${date}</td>
        <td class="values-open">${timeSeries[date]["1. open"].substring(
          0,
          5
        )}</td>
        <td class="values-high">${timeSeries[date]["2. high"].substring(
          0,
          5
        )}</td>
        <td class="values-low">${timeSeries[date]["3. low"].substring(
          0,
          5
        )}</td>
        <td class="values-close">${timeSeries[date]["4. close"].substring(
          0,
          5
        )}</td>
        <td class="values-volume">${timeSeries[date]["6. volume"]}</td>
    `;

    stockView.table[0].appendChild(tr);
  }

  new Chart(stockView.chart, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Stock Price",
          data: prices,
          borderWidth: 1,
        },
      ],
    },
  });

  stockView.buttonWallet[0].addEventListener("click", function (event) {
    event.preventDefault();
    wallet.addStock(
      companyData.symbol,
      1,
      timeSeries[lastRefreshed]["4. close"]
    );
    window.location.href = "../../pages/wallet.html";
    console.log(wallet);
  });
});
