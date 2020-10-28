'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters-container`);
  const mapFiltersFormElements = mapFilters.querySelector(`.map__filters`).children;
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);

  const activatePage = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.util.toggleElementsState(adFormFieldsets, false);
    window.util.toggleElementsState(mapFiltersFormElements, false);
    window.pins.renderPins();
    window.form.fillAddressField();
    window.pins.addMapPinsContainerListeners();
  };

  window.form.addAdFormListeners();
  window.mainPin.addMainMapPinListeners();

  window.util.toggleElementsState(adFormFieldsets, true);
  window.util.toggleElementsState(mapFiltersFormElements, true);
  window.form.fillAddressField();

  window.main = {
    activatePage
  };
})();
