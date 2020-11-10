'use strict';

(() => {

  const ANY_VALUE = `any`;
  const PriceOption = {
    ANY: `any`,
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`
  };
  const MIN_PRICE_OPTION = 10000;
  const MAX_PRICE_OPTION = 50000;
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersFormElements = mapFilters.children;

  const typeFilter = mapFilters.querySelector(`#housing-type`);
  const priceFilter = mapFilters.querySelector(`#housing-price`);
  const roomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const guestsFilter = mapFilters.querySelector(`#housing-guests`);
  const featuresFilter = mapFilters.querySelector(`#housing-features`);

  const activateFilters = () => {
    window.util.toggleElementsState(mapFiltersFormElements, false);
  };

  const deactivateFilters = () => {

    window.util.toggleElementsState(mapFiltersFormElements, true);

  };

  const filterByType = (ad) => {
    return typeFilter.value === ad.offer.type || typeFilter.value === ANY_VALUE;
  };

  const filterByPrice = (ad) => {
    const adPrice = ad.offer.price;

    switch (priceFilter.value) {
      case (PriceOption.ANY):
        return true;
      case (PriceOption.LOW):
        return adPrice < MIN_PRICE_OPTION;
      case (PriceOption.MIDDLE):
        return adPrice >= MIN_PRICE_OPTION && adPrice <= MAX_PRICE_OPTION;
      case (PriceOption.HIGH):
        return adPrice > MAX_PRICE_OPTION;

      default:
        return false;
    }
  };

  const filterByRoomsNumber = (ad) => {
    return Number(roomsFilter.value) === ad.offer.rooms || roomsFilter.value === ANY_VALUE;
  };

  const filterByGuestsNumber = (ad) => {
    return Number(guestsFilter.value) === ad.offer.guests || guestsFilter.value === ANY_VALUE;
  };

  const filterByFeatures = (ad) => {
    const availableFeatures = featuresFilter.querySelectorAll(`.map__checkbox`);
    const chosenFeatures = getChosenFeaturesValues(availableFeatures);
    const adFeatures = ad.offer.features;

    return chosenFeatures.every((chosenFeature) => adFeatures.includes(chosenFeature));

  };

  const getChosenFeaturesValues = (features) => {
    let chosenFeatures = [];
    features.forEach((feature) => {
      if (feature.checked) {
        chosenFeatures.push(feature.value);
      }
    });
    return chosenFeatures;
  };

  const applyFilter = window.debounce(() => {
    const ads = window.data.get();

    const filteredAds = ads.filter((ad) => {
      return filterByPrice(ad) && filterByType(ad) && filterByRoomsNumber(ad) && filterByGuestsNumber(ad) && filterByFeatures(ad);
    });
    window.card.remove();
    window.pins.remove();
    window.pins.render(filteredAds);
  });

  mapFilters.addEventListener(`change`, applyFilter);

  window.filter = {
    'activate': activateFilters,
    'deactivate': deactivateFilters,
    'features': filterByFeatures
  };
})();
