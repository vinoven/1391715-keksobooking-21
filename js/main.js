'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters-container`);
  const mapFiltersFormElements = mapFilters.querySelector(`.map__filters`).children;
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);

  const deactivatePage = () => {
    window.util.toggleElementsState(adFormFieldsets, true);
    window.util.toggleElementsState(mapFiltersFormElements, true);
    window.load(window.error.show);
  };

  const activatePage = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.util.toggleElementsState(adFormFieldsets, false);
    window.util.toggleElementsState(mapFiltersFormElements, false);
    window.form.fillAddressField();

    window.pins.render();
  };

  deactivatePage();
  window.mainPin.addMainMapPinListeners();
  window.form.addAdFormListeners();
  window.form.fillAddressField();

  window.main = {
    'activatePage': activatePage
  };
})();
