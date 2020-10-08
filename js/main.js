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
  let avatarCounter = ('0' + advertisementCounter).slice(-2); // Счетчик аватаров для последующей генерации строки. slice используем для того, что бы отсекать ведущий ноль при значении avatarCounter >= 10
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

const generatedAds = createAds();

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
mapPins.appendChild(createPinsFragment(generatedAds));
