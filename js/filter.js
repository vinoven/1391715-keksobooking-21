'use strict';

(() => {

  const ANY_VALUE = `any`;
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersFormElements = mapFilters.children;

  const typeFilter = mapFilters.querySelector(`#housing-type`);

  const activateFilters = () => {
    window.util.toggleElementsState(mapFiltersFormElements, false);
  };

  const deactivateFilters = () => {

    window.util.toggleElementsState(mapFiltersFormElements, true);

  };

  const filterByType = (ad) => {
    return typeFilter.value === ad.offer.type || typeFilter.value === ANY_VALUE;
  };

  const applyFilter = () => {
    const ads = window.data.get();

    const filteredAds = ads.filter((ad) => filterByType(ad));
    window.card.remove();
    window.pins.remove();
    window.pins.render(filteredAds);
  };

  typeFilter.addEventListener(`change`, applyFilter);


  window.filter = {
    'activate': activateFilters,
    'deactivate': deactivateFilters
  };
})();
