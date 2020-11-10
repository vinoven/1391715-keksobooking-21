'use strict';

(() => {
  const MAX_ADS_COUNT = 5;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinsContainer = document.querySelector(`.map__pins`);
  const pinSize = {
    'width': 50,
    'height': 70
  };


  const createPinElement = (element, counter) => {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = element.location.x - pinSize.width / 2 + `px`;
    pinElement.style.top = element.location.y - pinSize.height + `px`;
    pinElement.querySelector(`img`).src = element.author.avatar;
    pinElement.querySelector(`img`).alt = element.offer.title;
    pinElement.dataset.adIndex = counter;

    pinElement.addEventListener(`click`, (evt) => {
      const pinTarget = evt.target.className === `map__pin` ? evt.target : evt.target.parentElement;
      const mapPinIndex = pinTarget.dataset.adIndex;
      if (mapPinIndex) {
        window.card.render(element);
        pinTarget.classList.add(`map__pin--active`);
      }
    }
    );

    return pinElement;
  };

  const createPinsFragment = (ads) => {
    const counter = ads.length <= MAX_ADS_COUNT ? ads.length : MAX_ADS_COUNT;
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < counter; i++) {
      if (ads[i].offer) {
        fragment.appendChild(createPinElement(ads[i], i));
      }
    }
    return fragment;
  };

  const renderPins = (ads) => {
    removePins();
    mapPinsContainer.appendChild(createPinsFragment(ads));
  };

  const removePins = () => {
    const mapPins = mapPinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (mapPins) {
      mapPins.forEach((pin) => pin.remove());
    }
  };

  window.pins = {
    'render': renderPins,
    'remove': removePins
  };
})();
