"use strict";
view.buttonSubmit.addEventListener("click", function (event) {
  search(event);
});
view.inputSearch.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    search(event);
  }
});

const search = function (event) {
  event.preventDefault();

  // Search the input value
  searchStock(view.inputSearch.value).then(function (data) {
    view.resultats.innerHTML = "";
    data.bestMatches.forEach(function (result) {
      let li = document.createElement("li");
      li.innerHTML =
        "<a href='pages/stock.html?stock=" +
        result["1. symbol"] +
        "' >" +
        result["2. name"] +
        " (" +
        result["1. symbol"] +
        ")" +
        "</a>";
      view.resultats.appendChild(li);
    });
  });
};
