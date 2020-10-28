'use strict';

(() => {
  const MOUSE_MAIN_BUTTON_CODE = 0;
  const ENTER_KEY_CODE = 13;

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinsContainer = document.querySelector(`.map__pins`);
  const mainMapPin = mapPinsContainer.querySelector(`.map__pin--main`);
  const mainPinPointerSize = {
    width: 10,
    height: 22
  };

  const createPinElement = (element, counter) => {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = element.location.x + `px`;
    pinElement.style.top = element.location.y + `px`;
    pinElement.querySelector(`img`).src = element.author.avatar;
    pinElement.querySelector(`img`).alt = element.offer.title;
    pinElement.dataset.adIndex = counter;
    return pinElement;
  };

  const createPinsFragment = (adsArray) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < adsArray.length; i++) {
      fragment.appendChild(createPinElement(adsArray[i], i));
    }
    return fragment;
  };

  const renderPins = () => {
    const mapPins = mapPinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (mapPins.length === 0) {
      mapPinsContainer.appendChild(createPinsFragment(window.main.generatedAds));
    }
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

  const onMapPinEnterPress = (evt) => {
    if (evt.keyCode === ENTER_KEY_CODE) {
      window.card.renderAdCard(evt);
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

  const addMapPinsContainerListeners = () => {
    mapPinsContainer.addEventListener(`click`, window.card.renderAdCard);
    mapPinsContainer.addEventListener(`keydown`, onMapPinEnterPress);
  };

  const addMainMapPinListeners = () => {
    mainMapPin.addEventListener(`keydown`, onMainMapPinEnterPress);
    mainMapPin.addEventListener(`mousedown`, onMainMapPinMouseDown);
  };

  window.pins = {
    renderPins,
    getMainPinPointerPosition,
    addMapPinsContainerListeners,
    addMainMapPinListeners
  };
})();
