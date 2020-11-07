'use strict';

(() => {
  const ESCAPE_KEY_CODE = 27;
  const MOUSE_MAIN_BUTTON_CODE = 0;

  const showSuccessMessage = () => {
    const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successMessageElement = successMessageTemplate.cloneNode(true);
    const successMessageContainer = document.querySelector(`main`);
    successMessageContainer.appendChild(successMessageElement);

    document.addEventListener(`click`, closeSuccessMessage);
    document.addEventListener(`keydown`, closeSuccessMessage);

  };

  const closeSuccessMessage = (evt) => {
    if (evt.keyCode === ESCAPE_KEY_CODE || evt.button === MOUSE_MAIN_BUTTON_CODE) {
      document.querySelector(`.success`).remove();
      document.removeEventListener(`click`, closeSuccessMessage);
      document.removeEventListener(`keydown`, closeSuccessMessage);
    }
  };

  const showErrorMessage = (message) => {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector(`.error__message`).textContent = message;

    document.body.appendChild(errorElement);

    const errorButton = document.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, closeErrorMessage);
    document.addEventListener(`keydown`, closeErrorMessage);
  };

  const closeErrorMessage = (evt) => {
    if (evt.keyCode === ESCAPE_KEY_CODE || evt.button === MOUSE_MAIN_BUTTON_CODE) {
      document.querySelector(`.error`).remove();
      document.removeEventListener(`keydown`, closeErrorMessage);
    }
  };

  window.message = {
    'success': showSuccessMessage,
    'error': showErrorMessage
  };

})();
