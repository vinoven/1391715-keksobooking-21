'use strict';

(() => {
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
    'removeElements': removeElements,
    'toggleElementsState': toggleElementsState
  };
})();
