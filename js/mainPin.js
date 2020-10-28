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

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + `px`;
      mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + `px`;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    const onMouseUp = () => {
      window.form.fillAddressField();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
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
