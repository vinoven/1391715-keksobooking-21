'use strict';

(() => {

  const activatePage = () => {
    window.elements.map.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);
    window.util.toggleElementsState(window.form.adFormFieldsets, false);
    window.util.toggleElementsState(window.elements.mapFiltersFormElements, false);
    window.pins.renderPins();
    window.form.fillAddressField();
    window.pins.addMapPinsContainerListeners();
  };

  window.form.addAdFormListeners();
  window.pins.addMainMapPinListeners();

  const generatedAds = window.data.createAds();
  window.util.toggleElementsState(window.form.adFormFieldsets, true);
  window.util.toggleElementsState(window.elements.mapFiltersFormElements, true);
  window.form.fillAddressField();

  window.main = {
    generatedAds,
    activatePage
  };
})();
