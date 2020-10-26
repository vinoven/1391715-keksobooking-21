'use strict';

(() => {
  const AVATAR_BASE_LINK = `img/avatars/user`;
  const MIN_LOCATION_X = 0;
  const MAX_LOCATION_X = 1200;
  const MIN_LOCATION_Y = 130;
  const MAX_LOCATION_Y = 630;
  const ADVERTISEMENT_QUANTITY = 8;
  const TITLE_LIST = [
    `Для взыскательных хозяев`,
    `Вы привыкли к комфорту и избалованы возможностями современной техники?`,
    `Штучный экземпляр`,
    `Отбросим стереотипы`,
    `Ваше здоровье и комфорт, что может быть важнее?`,
    `Интерьер выполнен в цветах земли и неба`,
    `Морские просторы`,
    `С мечтой об античности`
  ];

  const MIN_AD_PRICE = 0;
  const MAX_AD_PRICE = 1000000;
  const TYPE_LIST = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
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
    `12:00`,
    `13:00`,
    `14:00`
  ];

  const FEATURES_LIST = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];

  const DESCRIPTION_LIST = [
    `Open from September 2017, TOKYO-W-INN Asakusa offers accommodations just a 4-minute walk from Tawaramachi Station and a 7-minute walk from Asakusa Station.`,
    `Free WiFi is available throughout the property. Guests can enjoy the on-site bar. Sensoji Temple is 12 minutes on foot.`,
    `There are several convenience stores, restaurants and cafes within a 3-minute walk from the property.`,
    `Each room is fitted with a shared bathroom with a bidet and shower, with slippers provided.`
  ];

  const PHOTO_LINK_LIST = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];

  const getAvatarLink = (advertisementCounter) => {
    let avatarCounter = (`0` + advertisementCounter);
    let avatarLink = AVATAR_BASE_LINK + avatarCounter + `.png`;
    return avatarLink;
  };

  const getOfferLocation = () => {
    let offerLocation = [];

    offerLocation = [window.util.getRandomIntegerFromRange(MIN_LOCATION_X, MAX_LOCATION_X), window.util.getRandomIntegerFromRange(MIN_LOCATION_Y, MAX_LOCATION_Y)];
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
        title: window.util.getRandomItemFromArray(TITLE_LIST),
        address: offerLocation.join(`, `),
        price: window.util.getRandomIntegerFromRange(MIN_AD_PRICE, MAX_AD_PRICE),
        type: window.util.getRandomItemFromArray(TYPE_LIST),
        rooms: window.util.getRandomItemFromArray(ROOM_OPACITY_LIST),
        guests: window.util.getRandomItemFromArray(GUEST_LIST),
        checkin: window.util.getRandomItemFromArray(CHECK_TIME),
        checkout: window.util.getRandomItemFromArray(CHECK_TIME),
        features: window.util.getMultipleRandomItemsFromArray(FEATURES_LIST),
        description: window.util.getRandomItemFromArray(DESCRIPTION_LIST),
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

  window.data = {
    createAds
  };
})();
