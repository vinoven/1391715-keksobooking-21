'use strict';

(() => {
  const TYPE_MAPPING = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };
  const ESCAPE_KEY_CODE = 27;
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters-container`);


  const fillCardFeatures = (ad, cardFeatures) => {
    const generatedFeatures = ad.offer.features;
    const defaultFeaturesElements = cardFeatures.children;

    window.util.removeElements(defaultFeaturesElements);

    for (let i = 0; i < generatedFeatures.length; i++) {
      cardFeatures.insertAdjacentHTML(`beforeend`, `<li></li>`);
      const featuresLastChild = cardFeatures.lastChild;
      featuresLastChild.classList.add(`popup__feature`, `popup__feature--` + generatedFeatures[i]);
      featuresLastChild.textContent = generatedFeatures[i];
    }
  };

  const fillCardPhotos = (ad, cardPhotos) => {
    const generatedPhotos = ad.offer.photos;
    const defaultPhotosElements = cardPhotos.children;

    window.util.removeElements(defaultPhotosElements);

    for (let i = 0; i < generatedPhotos.length; i++) {
      cardPhotos.insertAdjacentHTML(`beforeend`, `<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
      const photosLastChild = cardPhotos.lastChild;
      photosLastChild.src = generatedPhotos[i];
    }
  };

  const createAdCard = (ad) => {
    const cardElement = cardTemplate.cloneNode(true);

    const cardTitle = cardElement.querySelector(`.popup__title`);
    if (ad.offer.title) {
      cardTitle.textContent = ad.offer.title;
    } else {
      cardTitle.remove();
    }

    const cardAddress = cardElement.querySelector(`.popup__text--address`);
    if (ad.offer.address) {
      cardAddress.textContent = ad.offer.address;
    } else {
      cardAddress.remove();
    }

    const cardPrice = cardElement.querySelector(`.popup__text--price`);
    if (ad.offer.price) {
      cardPrice.textContent = ad.offer.price + `₽/ночь`;
    } else {
      cardPrice.remove();
    }

    const cardType = cardElement.querySelector(`.popup__type`);
    if (ad.offer.price) {
      cardType.textContent = TYPE_MAPPING[ad.offer.type];
    } else {
      cardType.remove();
    }

    const cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
    if (ad.offer.rooms && ad.offer.guests) {
      cardCapacity.textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
    } else {
      cardCapacity.remove();
    }

    const cardTime = cardElement.querySelector(`.popup__text--time`);
    if (ad.offer.checkin && ad.offer.checkout) {
      cardTime.textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;
    } else {
      cardTime.remove();
    }

    const cardFeatures = cardElement.querySelector(`.popup__features`);
    if (ad.offer.features) {
      fillCardFeatures(ad, cardFeatures);
    } else {
      cardFeatures.remove();
    }

    const cardDesc = cardElement.querySelector(`.popup__description`);
    if (ad.offer.description) {
      cardDesc.textContent = ad.offer.description;
    } else {
      cardDesc.remove();
    }

    const cardPhotos = cardElement.querySelector(`.popup__photos`);
    if (ad.offer.photos) {
      fillCardPhotos(ad, cardPhotos);
    } else {
      cardPhotos.remove();
    }

    const cardAvatar = cardElement.querySelector(`.popup__avatar`);
    if (ad.author.avatar) {
      cardAvatar.src = ad.author.avatar;
    } else {
      cardAvatar.remove();
    }

    return cardElement;
  };

  const renderAdCard = (pin) => {
    removeAdCards();
    mapFilters.insertAdjacentElement(`beforebegin`, createAdCard(pin));
    const currentCard = map.querySelector(`.map__card`);
    const adCloseButton = currentCard.querySelector(`.popup__close`);
    adCloseButton.addEventListener(`click`, onCloseButtonClick);
    document.addEventListener(`keydown`, onAdCardEscPress);
  };

  const onCloseButtonClick = (evt) => {
    if (evt.target) {
      removeAdCards();
    }
  };

  const onAdCardEscPress = (evt) => {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      removeAdCards();
    }
  };

  const removeAdCards = () => {
    const adCards = map.querySelectorAll(`.map__card`);

    if (adCards) {
      adCards.forEach((card) => card.remove());
    }

    document.removeEventListener(`keydown`, onAdCardEscPress);
  };

  window.card = {
    'render': renderAdCard
  };

})();
