"use strict";

const wallet = {
  _stocks: {},

  /**
   * Add a stock to the portfilio, with quantity and average price
   * @param ticker
   * @param name
   * @param quantite
   * @param pru
   */
  addStock: function (ticker, name, quantite, pru) {
    this.loadWallet();
    if (wallet._stocks[ticker]) {
      /*
       * Mise à jour du prix de revient unitaire (prix moyen). Ne prend pas les frais en compte.
       * On fait la moyenne des pru.
       */
      wallet._stocks[ticker].pru =
        (this._stocks[ticker].quantite * this._stocks[ticker].pru +
          quantite * pru) /
        (quantite + this._stocks[ticker].quantite);

      wallet._stocks[ticker].quantite += quantite;
    } else {
      wallet._stocks[ticker] = {
        name: name,
        quantite: quantite,
        pru: pru,
      };
    }
    this.saveWallet();
  },

  /**
   * Add quantity to a stock
   * @param ticker
   * @param quantite
   */
  addToStock: function (ticker, quantite) {
    this.loadWallet();
    wallet._stocks[ticker].quantite += quantite;
    this.saveWallet();
  },

  /**
   * Removes a stock from the wallet
   * @param ticker
   * @param quantite
   */
  removeStock: function (ticker, quantite) {
    this.loadWallet();
    wallet._stocks[ticker].quantite -= quantite;
    this.saveWallet();
  },

  /**
   * Delete a stock from the wallet
   * @param ticker
   */
  deleteStock: function (ticker) {
    this.loadWallet();
    delete wallet._stocks[ticker];
    this.saveWallet();
  },

  /**
   * Empty the wallet
   */
  emptyWallet: function () {
    this._stocks = {};
    this.saveWallet();
  },

  /**
   * Get the stocks in the wallet
   * @returns {Object}
   */
  getStocks: function () {
    this.loadWallet();
    if (this._stocks && Object.keys(this._stocks).length > 0) {
      return this._stocks;
    } else {
      return null;
    }
  },

  /**
   * Get the value of the wallet
   * @return {number}
   */
  getWalletValue: function () {
    this.loadWallet();
    let walletValue = 0;
    for (let ticker in this._stocks) {
      walletValue += this._stocks[ticker].quantite * this._stocks[ticker].pru;
    }
    return walletValue;
  },

  saveWallet: function () {
    if (wallet._stocks) {
      localStorage.setItem("wallet", JSON.stringify(wallet._stocks));
    } else {
      localStorage.clear();
    }
  },

  loadWallet: function () {
    if (localStorage.getItem("wallet")) {
      wallet._stocks = JSON.parse(localStorage.getItem("wallet"));
    } else {
      wallet._stocks = {};
    }
  },
};
