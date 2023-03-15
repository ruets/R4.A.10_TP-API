const portfolio = {

    stocks: {},

    /**
     * Add a stock to the portfilio, with quantity and average price
     * @param ticker
     * @param quantite
     * @param pru
     */
    addStock : function (ticker, quantite, pru) {

        if(portfolio.stocks[ticker]) {

            /*
             * Mise à jour du prix de revient unitaire (prix moyen). Ne prend pas les frais en compte.
             * On fait la moyenne des pru.
             */
            portfolio.stocks[ticker].pru = (this.stocks[ticker].quantite * this.stocks[ticker].pru +
                quantite * pru) / (quantite + this.stocks[ticker].quantite);

            portfolio.stocks[ticker].quantite += quantite;

        } else {

            portfolio.stocks[ticker] = {
                quantite: quantite,
                pru: pru
            }

        }
        console.log(portfolio.stocks)
    },

    /**
     * Removes a stock from the portfolio
     * @param ticker
     */
    removeStock : function (ticker) {
         portfolio.stocks.pop(ticker);
    }

}



