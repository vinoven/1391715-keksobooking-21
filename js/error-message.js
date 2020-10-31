'use strict';

(() => {
  const renderErrorMessage = (message) => {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector(`.error__message`).textContent = message;

    document.body.appendChild(errorElement);

    const errorButton = document.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, onErrorButtonClick);
  };

  const onErrorButtonClick = () => {
    const errorPopup = document.querySelector(`.error`);
    errorPopup.remove();
    window.pins.renderPins();
  };


  window.errorMessage = {
    render: renderErrorMessage
  };
})();
