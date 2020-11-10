'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = (callback) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        callback(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
