'use strict';

const MOUSE_MAIN_BUTTON_CODE = 0;
const ENTER_KEY_CODE = 13;
const MAIN_PIN_DEFAULT_POSITION = {
  'top': `375px`,
  'left': `570px`
};
const mapPinsContainer = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
const mainMapPin = mapPinsContainer.querySelector(`.map__pin--main`);
const mainPinPointerSize = {
  width: 10,
  height: 22
};

const onMainMapPinMouseDownToActivate = (evt) => {
  if (evt.button === MOUSE_MAIN_BUTTON_CODE) {
    window.main.activatePage();
  }
};

const onMainMapPinMouseDownToMove = (evt) => {

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

      const mainMapPinMuffinHeight = window.getComputedStyle(mainMapPin).getPropertyValue(`height`).slice(0, -2);
      const mapMainPinFullHeight = Number(mainMapPinMuffinHeight) + Number(mainPinPointerSize.height);

      const mapPinsInnerContainerMinHeight = 130;
      const mapPinsInnerContainerMaxHeight = 630;

      const mainMapPinMinPositionY = mapPinsInnerContainerMinHeight - mapMainPinFullHeight;
      const mainMapPinMaxPositionY = mapPinsInnerContainerMaxHeight - mapMainPinFullHeight;


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

const onMainMapPinEnterPressToActivate = (evt) => {
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
  const positionY = Math.round((map.classList.contains(`map--faded`)) ? mainPinTop + mainPinHeight / 2 : mainPinTop + mainPinHeight + mainPinPointerSize.height);

  const mainPinPointerPosition = [positionX, positionY];

  return mainPinPointerPosition;
};

const resetMainPinPositionToDefault = () => {
  mainMapPin.style.left = MAIN_PIN_DEFAULT_POSITION.left;
  mainMapPin.style.top = MAIN_PIN_DEFAULT_POSITION.top;
};

const addMainMapPinListeners = () => {
  mainMapPin.addEventListener(`mousedown`, onMainMapPinMouseDownToActivate);
  mainMapPin.addEventListener(`keydown`, onMainMapPinEnterPressToActivate);
};

const removeMainMapPinListeners = () => {
  mainMapPin.removeEventListener(`mousedown`, onMainMapPinMouseDownToActivate);
  mainMapPin.removeEventListener(`keydown`, onMainMapPinEnterPressToActivate);
};

mainMapPin.addEventListener(`mousedown`, onMainMapPinMouseDownToMove);
window.mainPin = {
  'getPointerPosition': getMainPinPointerPosition,
  'resetPosition': resetMainPinPositionToDefault,
  'addListeners': addMainMapPinListeners,
  'removeListeners': removeMainMapPinListeners
};
