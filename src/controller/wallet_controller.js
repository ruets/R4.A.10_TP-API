"use strict";

if (!wallet.getStocks()) {
  walletView.tableSection[0].innerHTML = `
        <tr>
        <td colspan="6" class="stock-ticker-total">Aucun stock dans le portefeuille</td>
        </tr>
    `;
} else {
  //On itère à partir de la liste du portefeuille
  for (let i = 0; i < Object.keys(wallet.getStocks()).length; i++) {
    let ticker = Object.keys(wallet._stocks)[i];
    let stock = wallet._stocks[ticker];
    //On crée un nouvel élément
    let tr = document.createElement("tr");

    getStockValue(ticker).then((data) => {
      let lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
      let price = data["Time Series (Daily)"][lastRefreshed]["4. close"];

      tr.setAttribute("id", ticker);
      tr.innerHTML = `
        <td class="stock-ticker">${ticker}</td>
        <td class="stock-name">${stock.name}</td>
        <td class="stock-price">
          <span class="stock-minus-button span-button" onclick="updateRow('${ticker}', 'minus')">
            <img src="../images/minus.svg" alt="minus" width="20" height="20">
          </span>
          
          <span class="stock-price-value">${price}</span>
          
          <span class="stock-plus-button span-button" onclick="updateRow('${ticker}', 'plus')">
            <img src="../images/plus.svg" alt="plus" width="20" height="20">
          </span></td>
        <td class="stock-quantite">${stock.quantite}</td>
        <td class="stock-total">${price * stock.quantite}</td>
        <td class="stock-delete">
          <span class="stock-delete-button span-button" onclick="updateRow('${ticker}', 'delete')">
            <img src="../images/archive.svg" alt="delete" width="20" height="20">
          </span>
        </td>
      `;
    });

    //On ajoute les informations à la section principale
    walletView.tableSection[0].append(tr);
  }

  let tr = document.createElement("tr");

  tr.setAttribute("id", "total");
  tr.innerHTML = `
        <td colspan="4" class="stock-ticker-total">TOTAL</td>
        <td class="stock-total">${wallet.getWalletValue()}</td>
        <td class="stock-delete">
          <span class="stock-delete-button span-button" onclick="emptyWallet()">
            <img src="../images/archive.svg" alt="delete" width="20" height="20">
          </span>
        </td>
      `;
  //On ajoute les informations à la section principale
  walletView.tableSection[0].append(tr);
}

function updateRow(ticker, fonction) {
  let tr = document.getElementById(ticker);
  let quantite = tr.getElementsByClassName("stock-quantite")[0];
  let price = tr
    .getElementsByClassName("stock-price")[0]
    .getElementsByClassName("stock-price-value")[0];
  let total = tr.getElementsByClassName("stock-total")[0];
  let totalWallet = document
    .getElementById("total")
    .getElementsByClassName("stock-total")[0];

  console.log(price.innerHTML);
  if (fonction === "plus") {
    wallet.addToStock(ticker, 1);
    quantite.innerHTML = parseInt(quantite.innerHTML) + 1;
    total.innerHTML =
      parseFloat(price.innerHTML) * parseInt(quantite.innerHTML);
    totalWallet.innerHTML = wallet.getWalletValue();
  } else if (fonction === "minus") {
    if (parseInt(quantite.innerHTML) > 1) {
      wallet.removeStock(ticker, 1);
      quantite.innerHTML = parseInt(quantite.innerHTML) - 1;
      total.innerHTML =
        parseFloat(price.innerHTML) * parseInt(quantite.innerHTML);
      totalWallet.innerHTML = wallet.getWalletValue();
    } else {
      if (window.confirm("Voulez-vous vraiment supprimer ce stock?")) {
        wallet.removeStock(ticker, 1);
        tr.remove();
        totalWallet.innerHTML = wallet.getWalletValue();
      }
    }
  } else if (fonction === "delete") {
    if (window.confirm("Voulez-vous vraiment supprimer ce stock?")) {
      wallet.removeStock(ticker, parseInt(quantite.innerHTML));
      tr.remove();
    }
  }
}

function emptyWallet() {
  if (window.confirm("Voulez-vous vraiment vider le portefeuille?")) {
    wallet.emptyWallet();
    location.reload();
  }
}
