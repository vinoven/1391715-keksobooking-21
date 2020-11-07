'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters-container`);
  const mapFiltersFormElements = mapFilters.querySelector(`.map__filters`).children;
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);

  const deactivatePage = () => {
    const isMapFaded = map.classList.contains(`map--faded`);
    const isAdFormDisabled = adForm.classList.contains(`ad-form--disabled`);

    if (!isMapFaded) {
      map.classList.add(`map--faded`);
    }

    if (!isAdFormDisabled) {
      adForm.classList.add(`ad-form--disabled`);
    }

    adForm.classList.add(`ad-form--disabled`);
    window.util.toggleElementsState(adFormFieldsets, true);
    window.util.toggleElementsState(mapFiltersFormElements, true);
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
  window.request.load(window.data.save, window.message.error);
  window.mainPin.addListeners();
  window.form.addAdFormListeners();
  window.form.fillAddressField();

  window.main = {
    'activatePage': activatePage,
    'deactivatePage': deactivatePage
  };
})();
