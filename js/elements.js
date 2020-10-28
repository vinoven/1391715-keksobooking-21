'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters-container`);
  const mapFiltersFormElements = mapFilters.querySelector(`.map__filters`).children;

  window.elements = {
    map,
    mapFilters,
    mapFiltersFormElements
  };

})();
