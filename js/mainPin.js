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

      const calculatedCoords = {
        x: mainMapPin.offsetLeft - shift.x,
        y: mainMapPin.offsetTop - shift.y
      };

      const calculateMainPinPosition = () => {
        const mainMapPinWidth = window.getComputedStyle(mainMapPin).getPropertyValue(`width`);
        const mainMapPinWidthHalfWidth = mainMapPinWidth.slice(0, -2) / 2;
        const mapPinsContainerWidth = window.getComputedStyle(mapPinsContainer).getPropertyValue(`width`);

        const mainMapPinMinPositionX = 0 - mainMapPinWidthHalfWidth;
        const mainMapPinMaxPositionX = mapPinsContainerWidth.slice(0, -2) - mainMapPinWidthHalfWidth;

        const mainMapPinMinPositionY = 130;
        const mainMapPinMaxPositionY = 630;


        if (calculatedCoords.x < mainMapPinMinPositionX) {
          mainMapPin.style.left = mainMapPinMinPositionX + `px`;
        } else if (calculatedCoords.x > mainMapPinMaxPositionX) {
          mainMapPin.style.left = mainMapPinMaxPositionX + `px`;
        } else {
          mainMapPin.style.left = calculatedCoords.x + `px`;
        }

        if (calculatedCoords.y < mainMapPinMinPositionY) {
          mainMapPin.style.top = mainMapPinMinPositionY + `px`;
        } else if (calculatedCoords.y > mainMapPinMaxPositionY) {
          mainMapPin.style.top = mainMapPinMaxPositionY + `px`;
        } else {
          mainMapPin.style.top = calculatedCoords.y + `px`;
        }
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      calculateMainPinPosition();
      window.form.fillAddressField();
    };

    const onMouseUp = () => {
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
