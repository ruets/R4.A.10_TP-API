//On itère à partir de la liste du portefeuille
for (i = 0; i < Object.keys(portfolio.stocks).length; i++) {
  let ticker = Object.keys(portfolio.stocks)[i];
  let stock = portfolio.stocks[ticker];
  //On crée un nouvel élément
  let div = document.createElement("div");

  let information = getCompanyOverview(ticker)
    .then((information) => {
      console.log(information);
      return information;
    })
    .then((information) => {
      div.innerHTML =
        "<div>" +
        "<h2>" +
        information.Name +
        "</h2>" +
        "<p>" +
        stock.quantite +
        "</p>" +
        "</div>";
    });

  //On ajoute les informations à la section principale
  portfolioView.mainSection.append(div);
}
