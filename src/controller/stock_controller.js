"use strict";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const stock = urlParams.get("stock");
document.title = stock + " - Stock";

const stocks = getStockValue(stock);
const data = stocks["Meta Data"];

console.log(stockView.titleStock);

//Getting overview and fundamental information
const companyOverview = getCompanyOverview(stock).then((companyOverview) => {
    stockView.titleStock.textContent = companyOverview.Name;
});


console.log(stocks);
