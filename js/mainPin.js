'use strict';

(() => {
  const MOUSE_MAIN_BUTTON_CODE = 0;
  const ENTER_KEY_CODE = 13;
  const mapPinsContainer = document.querySelector(`.map__pins`);

  const mainMapPin = mapPinsContainer.querySelector(`.map__pin--main`);
  const mainPinPointerSize = {
    width: 10,
    height: 22
  };

  const onMainMapPinMouseDown = (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON_CODE) {
      window.main.activatePage();
    }
  };

  const onMainMapPinEnterPress = (evt) => {
    if (evt.keyCode === ENTER_KEY_CODE) {
      window.main.activatePage();
    }
  };

  const getMainPinPointerPosition = () => {
    const mainPinWidth = parseInt(getComputedStyle(mainMapPin).getPropertyValue(`width`), 10);
    const mainPinHeight = parseInt(getComputedStyle(mainMapPin).getPropertyValue(`height`), 10);
    const mainPinLeft = parseInt(getComputedStyle(mainMapPin).getPropertyValue(`left`), 10);
    const mainPinTop = parseInt(getComputedStyle(mainMapPin).getPropertyValue(`top`), 10);

    const positionX = Math.round(mainPinLeft + mainPinWidth / 2);
    const positionY = Math.round((window.elements.map.classList.contains(`map--faded`)) ? mainPinTop + mainPinHeight / 2 : mainPinTop + mainPinHeight + mainPinPointerSize.height);

    const mainPinPointerPosition = [positionX, positionY];

    return mainPinPointerPosition;
  };

  const addMainMapPinListeners = () => {
    mainMapPin.addEventListener(`keydown`, onMainMapPinEnterPress);
    mainMapPin.addEventListener(`mousedown`, onMainMapPinMouseDown);
  };

  window.mainPin = {
    getMainPinPointerPosition,
    addMainMapPinListeners
  };

})();
