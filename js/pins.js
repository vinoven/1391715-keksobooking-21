'use strict';

(() => {
  const ENTER_KEY_CODE = 13;

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinsContainer = document.querySelector(`.map__pins`);

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

  const onMapPinEnterPress = (evt) => {
    if (evt.keyCode === ENTER_KEY_CODE) {
      window.card.renderAdCard(evt);
    }
  };

  const addMapPinsContainerListeners = () => {
    mapPinsContainer.addEventListener(`click`, window.card.renderAdCard);
    mapPinsContainer.addEventListener(`keydown`, onMapPinEnterPress);
  };

  window.pins = {
    renderPins,
    addMapPinsContainerListeners,
  };
})();
