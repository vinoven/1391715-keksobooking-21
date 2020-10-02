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
]

const PRICE_LIST = [
  1000,
  2000,
  3000,
  4000,
  5000,
  6000,
  7000,
  8000
]

const TYPE_LIST = [
  'palace',
  'flat',
  'house',
  'bungalow'
]

const ROOM_OPACITY_LIST = [
  1,
  2,
  3
]

const GUEST_LIST = [
  1,
  2,
  3
]

const CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00'
]

const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]

const DESCRIPTION_LIST = [
  'Open from September 2017, TOKYO-W-INN Asakusa offers accommodations just a 4-minute walk from Tawaramachi Station and a 7-minute walk from Asakusa Station.',
  'Free WiFi is available throughout the property. Guests can enjoy the on-site bar. Sensoji Temple is 12 minutes on foot.',
  'There are several convenience stores, restaurants and cafes within a 3-minute walk from the property.',
  'Each room is fitted with a shared bathroom with a bidet and shower, with slippers provided.'
]

const PHOTO_LINK_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
]

const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = 1200;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;

let offerLocation = [];
let advertisementList = [];
let advertisementItem = {};

const getAvatarLink = (advertisementCounter) => {
  let avatarCounter = ('0' + advertisementCounter).slice(-2); // Счетчик аватаров для последующей генерации строки. slice используем для того, что бы отсекать ведущий ноль при значении avatarCounter >= 10
  let avatarLink = AVATAR_BASE_LINK + avatarCounter + '.png';
  return avatarLink;
};

const getRandomItemFromArray = (array) => {
  const arrayItem = array[Math.floor(Math.random() * array.length)]
  return arrayItem;
}

const getRandomIntegerFromRange = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const getOfferLocation = () => {
  offerLocation = [getRandomIntegerFromRange(MIN_LOCATION_X, MAX_LOCATION_X), getRandomIntegerFromRange(MIN_LOCATION_Y, MAX_LOCATION_Y)];
  return offerLocation;
}

const generateAdvertisement = (title, price, type, rooms, guests, checkTime, features, description, photos, advertisementCounter) => {
  getOfferLocation();
  advertisementItem = {
    author: {
      avatar: getAvatarLink(advertisementCounter)
    },

    offer: {
      title: getRandomItemFromArray(title),
      address: offerLocation.join(', '),
      price: getRandomItemFromArray(price),
      type: getRandomItemFromArray(type),
      rooms: getRandomItemFromArray(rooms),
      guests: getRandomItemFromArray(guests),
      checkin: getRandomItemFromArray(checkTime),
      checkout: getRandomItemFromArray(checkTime),
      features: getRandomItemFromArray(features),
      description: getRandomItemFromArray(description),
      photos: getRandomItemFromArray(photos)
    },

    location: {
      x: offerLocation[0],
      y: offerLocation[1]
    },
  }
  return advertisementItem;
}

const generateAdvertisementList = () => {

  for (let i = 0; i < ADVERTISEMENT_QUANTITY; i++) {
    let advertisementCounter = i + 1;
    generateAdvertisement(TITLE_LIST, PRICE_LIST, TYPE_LIST, ROOM_OPACITY_LIST, GUEST_LIST, CHECK_TIME, FEATURES_LIST, DESCRIPTION_LIST, PHOTO_LINK_LIST, advertisementCounter);
    advertisementList.push(advertisementItem);
  }
  console.log(advertisementList)
  return advertisementList;
}

generateAdvertisementList();


// {
//   "author": {
//       "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//   },
//   "offer": {
//       "title": строка, заголовок предложения
//       "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//       "price": число, стоимость
//       "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
//       "rooms": число, количество комнат
//       "guests": число, количество гостей, которое можно разместить
//       "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//       "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//       "description": строка с описанием,
//       "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//   },
//   "location": {
//       "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//       "y": случайное число, координата y метки на карте от 130 до 630.
//   }
// }
