'use strict';

const ADVERTISEMENT_QUANTITY = 8;

const AVATAR_BASE_LINK = 'img/avatars/user';

const TITLE_LIST = [
  'Для взыскательных хозяев',
  'Вы привыкли к комфорту и избалованы возможностями современной техники?',
  'Штучный экземпляр',
  'Отбросим стереотипы',
  'Ваше здоровье и комфорт, что может быть важнее?',
  'Интерьер выполнен в цветах земли и неба',
  'Морские просторы',
  'С мечтой об античности'
];

const PRICE_LIST = [
  1000,
  2000,
  3000,
  4000,
  5000,
  6000,
  7000,
  8000
];

const TYPE_LIST = [
  'palace',
  'flat',
  'house',
  'bungalow'
];

const TYPE_MAPPING = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало'
};

const ROOM_OPACITY_LIST = [
  1,
  2,
  3
];

const GUEST_LIST = [
  1,
  2,
  3
];

const CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTION_LIST = [
  'Open from September 2017, TOKYO-W-INN Asakusa offers accommodations just a 4-minute walk from Tawaramachi Station and a 7-minute walk from Asakusa Station.',
  'Free WiFi is available throughout the property. Guests can enjoy the on-site bar. Sensoji Temple is 12 minutes on foot.',
  'There are several convenience stores, restaurants and cafes within a 3-minute walk from the property.',
  'Each room is fitted with a shared bathroom with a bidet and shower, with slippers provided.'
];

const PHOTO_LINK_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = 1200;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const PIN_OFFSET_X = PIN_WIDTH / 2;
const PIN_OFFSET_Y = PIN_HEIGHT / 2;

const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const mapFilters = document.querySelector('.map__filters-container');
const mapPins = document.querySelector('.map__pins');
const map = document.querySelector('.map');

const getAvatarLink = (advertisementCounter) => {
  let avatarCounter = ('0' + advertisementCounter);
  let avatarLink = AVATAR_BASE_LINK + avatarCounter + '.png';
  return avatarLink;
};

const getRandomItemFromArray = (array) => {
  const arrayItem = array[Math.floor(Math.random() * array.length)];
  return arrayItem;
};

const getMultipleRandomItemsFromArray = (array) => {
  let generatedArray = [];
  for (let i = 0; i < array.length; i++) {
    let checker = Math.round(Math.random());
    if (checker) {
      generatedArray.push(array[i]);
    }
  }
  return generatedArray;
};

const getRandomIntegerFromRange = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getOfferLocation = () => {
  let offerLocation = [];

  offerLocation = [getRandomIntegerFromRange(MIN_LOCATION_X, MAX_LOCATION_X), getRandomIntegerFromRange(MIN_LOCATION_Y, MAX_LOCATION_Y)];
  return offerLocation;
};

const createAd = (advertisementCounter) => {
  let adItem = {};
  const offerLocation = getOfferLocation();
  adItem = {
    author: {
      avatar: getAvatarLink(advertisementCounter)
    },

    offer: {
      title: getRandomItemFromArray(TITLE_LIST),
      address: offerLocation.join(', '),
      price: getRandomItemFromArray(PRICE_LIST),
      type: getRandomItemFromArray(TYPE_LIST),
      rooms: getRandomItemFromArray(ROOM_OPACITY_LIST),
      guests: getRandomItemFromArray(GUEST_LIST),
      checkin: getRandomItemFromArray(CHECK_TIME),
      checkout: getRandomItemFromArray(CHECK_TIME),
      features: getMultipleRandomItemsFromArray(FEATURES_LIST),
      description: getRandomItemFromArray(DESCRIPTION_LIST),
      photos: PHOTO_LINK_LIST
    },

    location: {
      x: offerLocation[0],
      y: offerLocation[1]
    },
  };
  return adItem;
};

const createAds = () => {
  let ads = [];

  for (let i = 0; i < ADVERTISEMENT_QUANTITY; i++) {
    let advertisementCounter = i + 1;
    ads.push(createAd(advertisementCounter));
  }
  return ads;
};

const createPinElement = (element) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style = "left: " + (element.location.x + PIN_OFFSET_X) + "px" + "; " + "top: " + (element.location.y + PIN_OFFSET_Y) + "px";
  pinElement.querySelector("img").src = element.author.avatar;
  pinElement.querySelector("img").alt = element.offer.title;
  return pinElement;
};

const createPinsFragment = (adsArray) => {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < adsArray.length; i++) {
    fragment.appendChild(createPinElement(adsArray[i]));
  }
  return fragment;
};

const fillCardFeatures = (ad, cardFeatures) => {
  const generatedFeatures = ad.offer.features;
  const defaultFeturesElements = cardFeatures.children;

  while (defaultFeturesElements.length > 0) {
    defaultFeturesElements[0].remove();
  }

  for (let i = 0; i < generatedFeatures.length; i++) {
    cardFeatures.insertAdjacentHTML('beforeend', '<li></li>');
    const featuresLastChild = cardFeatures.lastChild;
    featuresLastChild.classList.add('popup__feature', 'popup__feature--' + generatedFeatures[i]);
    featuresLastChild.textContent = generatedFeatures[i];
  }
};

const fillCardPhotos = (ad, cardPhotos) => {
  const generatedPhotos = ad.offer.photos;
  const defaultPhotosElements = cardPhotos.children;

  while (defaultPhotosElements.length > 0) {
    defaultPhotosElements[0].remove();
  }

  for (let i = 0; i < generatedPhotos.length; i++) {
    cardPhotos.insertAdjacentHTML('beforeend', '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    const photosLastChild = cardPhotos.lastChild;
    photosLastChild.src = generatedPhotos[i];
  }
};

const createAdCard = (ad) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.popup__title');
  if (ad.offer.title) {
    cardTitle.textContent = ad.offer.title;
  } else {
    cardTitle.remove();
  }

  const cardAddress = cardElement.querySelector('.popup__text--address');
  if (ad.offer.address) {
    cardAddress.textContent = ad.offer.address;
  } else {
    cardAddress.remove();
  }

  const cardPrice = cardElement.querySelector('.popup__text--price');
  if (ad.offer.price) {
    cardPrice.textContent = ad.offer.price + '₽/ночь';
  } else {
    cardPrice.remove();
  }

  const cardType = cardElement.querySelector('.popup__type');
  if (ad.offer.price) {
    cardType.textContent = TYPE_MAPPING[ad.offer.type];
  } else {
    cardType.remove();
  }

  const cardCapacity = cardElement.querySelector('.popup__text--capacity');
  if (ad.offer.rooms && ad.offer.guests) {
    cardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  } else {
    cardCapacity.remove();
  }

  const cardTime = cardElement.querySelector('.popup__text--time');
  if (ad.offer.checkin && ad.offer.checkout) {
    cardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  } else {
    cardTime.remove();
  }

  const cardFeatures = cardElement.querySelector('.popup__features');
  if (ad.offer.features) {
    fillCardFeatures(ad, cardFeatures);
  } else {
    cardFeatures.remove();
  }

  const cardDesc = cardElement.querySelector('.popup__description');
  if (ad.offer.description) {
    cardDesc.textContent = ad.offer.description;
  } else {
    cardDesc.remove();
  }

  const cardPhotos = cardElement.querySelector('.popup__photos');
  if (ad.offer.photos) {
    fillCardPhotos(ad, cardPhotos);
  } else {
    cardPhotos.remove();
  }

  const cardAvatar = cardElement.querySelector('.popup__avatar');
  if (ad.author.avatar) {
    cardAvatar.src = ad.author.avatar;
  } else {
    cardAvatar.remove();
  }

  return cardElement;
};

map.classList.remove('map--faded');
const generatedAds = createAds();
mapPins.appendChild(createPinsFragment(generatedAds));
mapFilters.insertAdjacentElement('beforebegin', createAdCard(generatedAds[0]));
