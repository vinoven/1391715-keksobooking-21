'use strict';

(() => {
  let ads = null;

  const getAds = () => {
    return ads;
  };

  const saveAds = (inputAds) => {
    ads = inputAds;
  };

  window.data = {
    'get': getAds,
    'save': saveAds
  };
})();
