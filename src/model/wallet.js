"use strict";

const wallet = {
  stocks: {},

  /**
   * Add a stock to the portfilio, with quantity and average price
   * @param ticker
   * @param quantite
   * @param pru
   */
  addStock: function (ticker, quantite, pru) {
    this.loadWallet();
    if (wallet.stocks[ticker]) {
      /*
       * Mise à jour du prix de revient unitaire (prix moyen). Ne prend pas les frais en compte.
       * On fait la moyenne des pru.
       */
      wallet.stocks[ticker].pru =
        (this.stocks[ticker].quantite * this.stocks[ticker].pru +
          quantite * pru) /
        (quantite + this.stocks[ticker].quantite);

      wallet.stocks[ticker].quantite += quantite;
    } else {
      wallet.stocks[ticker] = {
        quantite: quantite,
        pru: pru,
      };
    }
    this.saveWallet();
  },

  /**
   * Removes a stock from the wallet
   * @param ticker
   */
  removeStock: function (ticker) {
    this.loadWallet();
    wallet.stocks.pop(ticker);
    this.saveWallet();
  },

  saveWallet: function () {
    if (wallet.stocks) {
      localStorage.setItem("wallet", JSON.stringify(wallet.stocks));
    } else {
      localStorage.setItem("wallet", JSON.stringify(null));
    }
  },

  loadWallet: function () {
    if (localStorage.getItem("wallet")) {
      wallet.stocks = JSON.parse(localStorage.getItem("wallet"));
    } else {
      wallet.stocks = {};
    }
  },
};
