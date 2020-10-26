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

const MIN_AD_PRICE = 0;
const MAX_AD_PRICE = 1000000;

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

const ROOM_TYPE_PRICE_MAPPING = {
  palace: 10000,
  flat: 5000,
  house: 1000,
  bungalow: 10
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

const MOUSE_MAIN_BUTTON_CODE = 0;
const ENTER_KEY_CODE = 13;
const ESCAPE_KEY_CODE = 27;

const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const mapFilters = document.querySelector('.map__filters-container');
const mapPinsContainer = document.querySelector('.map__pins');
const mainMapPin = mapPinsContainer.querySelector('.map__pin--main');
const mainPinPointerSize = {
  width: 10,
  height: 22
};
const map = document.querySelector('.map');
const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const adFormAddressField = adForm.querySelector('#address');
const mapFiltersFormElements = mapFilters.querySelector('.map__filters').children;
const guestNumberSelect = adForm.querySelector('#capacity');
const roomNumberSelect = adForm.querySelector('#room_number');
const roomTypeSelect = adForm.querySelector('#type');
const roomPriceSelect = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');

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
      price: getRandomIntegerFromRange(MIN_AD_PRICE, MAX_AD_PRICE),
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

const createPinElement = (element, counter) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = element.location.x + "px";
  pinElement.style.top = element.location.y + "px";
  pinElement.querySelector("img").src = element.author.avatar;
  pinElement.querySelector("img").alt = element.offer.title;
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

const removeElements = (elements) => {
  while (elements.length > 0) {
    elements[0].remove();
  }
};

const fillCardFeatures = (ad, cardFeatures) => {
  const generatedFeatures = ad.offer.features;
  const defaultFeaturesElements = cardFeatures.children;

  removeElements(defaultFeaturesElements);

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

  removeElements(defaultPhotosElements);

  for (let i = 0; i < generatedPhotos.length; i++) {
    cardPhotos.insertAdjacentHTML('beforeend', '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    const photosLastChild = cardPhotos.lastChild;
    photosLastChild.src = generatedPhotos[i];
  }
};

const createAdCard = (ad) => {
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

const toggleElementsState = (elements, isDisabled) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = isDisabled;
  }
};

const activatePage = () => {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  toggleElementsState(adFormFieldsets, false);
  toggleElementsState(mapFiltersFormElements, false);
  renderPins();
  fillAddressField();
  addMapPinsContainerListeners();
};

const renderPins = () => {
  const mapPins = mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
  if (mapPins.length === 0) {
    mapPinsContainer.appendChild(createPinsFragment(generatedAds));
  }
};

const onMainMapPinMouseDown = (evt) => {
  if (evt.button === MOUSE_MAIN_BUTTON_CODE) {
    activatePage();
  }
};

const onMainMapPinEnterPress = (evt) => {
  if (evt.keyCode === ENTER_KEY_CODE) {
    activatePage();
  }
};

const onMapPinEnterPress = (evt) => {
  if (evt.keyCode === ENTER_KEY_CODE) {
    renderAdCard(evt);
  }
};

const getMainPinPointerPosition = () => {
  const mainPinWidth = parseInt(getComputedStyle(mainMapPin).getPropertyValue('width'), 10);
  const mainPinHeight = parseInt(getComputedStyle(mainMapPin).getPropertyValue('height'), 10);
  const mainPinLeft = parseInt(getComputedStyle(mainMapPin).getPropertyValue('left'), 10);
  const mainPinTop = parseInt(getComputedStyle(mainMapPin).getPropertyValue('top'), 10);

  const positionX = Math.round(mainPinLeft + mainPinWidth / 2);
  const positionY = Math.round((map.classList.contains('map--faded')) ? mainPinTop + mainPinHeight / 2 : mainPinTop + mainPinHeight + mainPinPointerSize.height);

  const mainPinPointerPosition = [positionX, positionY];

  return mainPinPointerPosition;
};

const fillAddressField = () => {
  adFormAddressField.value = getMainPinPointerPosition();
};

const validateGuestNumber = () => {

  if (roomNumberSelect.value !== '100' && guestNumberSelect.value > roomNumberSelect.value) {
    guestNumberSelect.setCustomValidity('Гостей не должно быть больше количества комнат');
  } else if (roomNumberSelect.value === '100' && guestNumberSelect.value !== '0') {
    guestNumberSelect.setCustomValidity('100 комнат недоступны для гостей');
  } else if (roomNumberSelect.value !== '100' && guestNumberSelect.value === '0') {
    guestNumberSelect.setCustomValidity('Укажите количество гостей');
  } else {
    guestNumberSelect.setCustomValidity('');
  }
  return guestNumberSelect.reportValidity();
};

const validateRoomMinPrice = () => {
  const roomType = roomTypeSelect.value;
  roomPriceSelect.min = ROOM_TYPE_PRICE_MAPPING[roomType];
  roomPriceSelect.placeholder = ROOM_TYPE_PRICE_MAPPING[roomType];
};

const validateTimeIn = () => {
  timeOutSelect.value = timeInSelect.value;
};

const validateTimeOut = () => {
  timeInSelect.value = timeOutSelect.value;
};

const removeAdCard = () => {
  const currentCard = map.querySelector('.map__card');

  if (currentCard) {
    currentCard.remove();
  }

  document.removeEventListener('keydown', onAdCardEscPress);
};

const renderAdCard = (evt) => {
  const pinTarget = evt.target.className === 'map__pin' ? evt.target : evt.target.parentElement;
  const mapPinIndex = pinTarget.dataset.adIndex;

  if (mapPinIndex) {
    removeAdCard();
    mapFilters.insertAdjacentElement('beforebegin', createAdCard(generatedAds[mapPinIndex]));
    const currentCard = map.querySelector('.map__card');
    const adCloseButton = currentCard.querySelector('.popup__close');
    adCloseButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onAdCardEscPress);
  }
};

const onCloseButtonClick = (evt) => {
  if (evt.target) {
    removeAdCard();
  }
};

const onAdCardEscPress = (evt) => {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    removeAdCard();
  }
};

// EventListener functions

const addMapPinsContainerListeners = () => {
  mapPinsContainer.addEventListener('click', renderAdCard);
  mapPinsContainer.addEventListener('keydown', onMapPinEnterPress);
};


const addAdFormListeners = () => {
  guestNumberSelect.addEventListener('change', validateGuestNumber);
  roomTypeSelect.addEventListener('change', validateRoomMinPrice);
  timeInSelect.addEventListener('change', validateTimeIn);
  timeOutSelect.addEventListener('change', validateTimeOut);
};

const addMainMapPinListeners = () => {
  mainMapPin.addEventListener('keydown', onMainMapPinEnterPress);
  mainMapPin.addEventListener('mousedown', onMainMapPinMouseDown);
};

// Main
addAdFormListeners();
addMainMapPinListeners();

const generatedAds = createAds();
toggleElementsState(adFormFieldsets, true);
toggleElementsState(mapFiltersFormElements, true);
adFormAddressField.value = getMainPinPointerPosition();
