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
      features: getRandomItemFromArray(FEATURES_LIST),
      description: getRandomItemFromArray(DESCRIPTION_LIST),
      photos: getRandomItemFromArray(PHOTO_LINK_LIST)
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


map.classList.remove('map--faded');
const generatedAds = createAds();
mapPins.appendChild(createPinsFragment(generatedAds));

const createAdCard = (adsArray) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  const cardElement = cardTemplate.cloneNode(true);
  const cardItem = adsArray[0];

  cardElement.querySelector('.popup__title').textContent = cardItem.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardItem.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = cardItem.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPE_MAPPING[cardItem.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = cardItem.offer.rooms + ' комнаты для ' + cardItem.offer.guests + 'гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = cardItem.offer.features;
  cardElement.querySelector('.popup__description').textContent = cardItem.offer.description;
  cardElement.querySelector('.popup__photos').querySelector('img').src = cardItem.offer.photos;
  cardElement.querySelector('.popup__avatar').src = cardItem.author.avatar;

  console.log(cardElement);
};

createAdCard(generatedAds);

// На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления (карточка объявления), заполните его данными из объекта:

// Выведите заголовок объявления offer.title в заголовок .popup__title.
// Выведите адрес offer.address в блок .popup__text--address.
// Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.
// В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalow, Дом для house, Дворец для palace.
// Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
// Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
// В список .popup__features выведите все доступные удобства в объявлении.
// В блок .popup__description выведите описание объекта недвижимости offer.description.
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
// Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
// Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.
