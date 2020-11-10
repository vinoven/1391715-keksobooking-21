'use strict';

(() => {
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

  const removeElements = (elements) => {
    while (elements.length > 0) {
      elements[0].remove();
    }
  };

  const toggleElementsState = (elements, isDisabled) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  window.util = {
    'getRandomItemFromArray': getRandomItemFromArray,
    'getMultipleRandomItemsFromArray': getMultipleRandomItemsFromArray,
    'getRandomIntegerFromRange': getRandomIntegerFromRange,
    'removeElements': removeElements,
    'toggleElementsState': toggleElementsState
  };
})();
