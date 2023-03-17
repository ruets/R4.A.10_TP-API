"use strict";
searchView.buttonSubmit.addEventListener("click", function (event) {
  search(event);
});
searchView.inputSearch.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    search(event);
  }
});

searchView.buttonFavoris.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "pages/portfolio.html";
});
const search = function (event) {
  event.preventDefault();

  // Search the input value
  searchStock(searchView.inputSearch.value).then(function (data) {
    searchView.resultats.innerHTML = "";
    data.bestMatches.forEach(function (result) {
      let li = document.createElement("li");
      li.innerHTML =
        "<a href='pages/stock.html?symbol=" +
        result["1. symbol"] +
        "&name=" +
        result["2. name"] +
        "' >" +
        result["2. name"] +
        " (" +
        result["1. symbol"] +
        ")" +
        "</a>";
      searchView.resultats.appendChild(li);
    });
  });
};
