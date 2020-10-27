'use strict';

(() => {
  const ROOM_TYPE_PRICE_MAPPING = {
    palace: 10000,
    flat: 5000,
    house: 1000,
    bungalow: 10
  };
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const adFormAddressField = adForm.querySelector(`#address`);
  const guestNumberSelect = adForm.querySelector(`#capacity`);
  const roomNumberSelect = adForm.querySelector(`#room_number`);
  const roomTypeSelect = adForm.querySelector(`#type`);
  const roomPriceSelect = adForm.querySelector(`#price`);
  const timeInSelect = adForm.querySelector(`#timein`);
  const timeOutSelect = adForm.querySelector(`#timeout`);

  const fillAddressField = () => {
    adFormAddressField.value = window.pins.getMainPinPointerPosition();
  };

  const validateGuestNumber = () => {

    if (roomNumberSelect.value !== `100` && guestNumberSelect.value > roomNumberSelect.value) {
      guestNumberSelect.setCustomValidity(`Гостей не должно быть больше количества комнат`);
    } else if (roomNumberSelect.value === `100` && guestNumberSelect.value !== `0`) {
      guestNumberSelect.setCustomValidity(`100 комнат недоступны для гостей`);
    } else if (roomNumberSelect.value !== `100` && guestNumberSelect.value === `0`) {
      guestNumberSelect.setCustomValidity(`Укажите количество гостей`);
    } else {
      guestNumberSelect.setCustomValidity(``);
    }
    return guestNumberSelect.reportValidity();
  };

  const validateRoomMinPrice = () => {
    const roomType = roomTypeSelect.value;
    roomPriceSelect.min = ROOM_TYPE_PRICE_MAPPING[roomType];
    roomPriceSelect.placeholder = ROOM_TYPE_PRICE_MAPPING[roomType];
  };

  const validateTimeIn = () => {
    timeOutSelect.value = timeInSelect.value;
  };

  const validateTimeOut = () => {
    timeInSelect.value = timeOutSelect.value;
  };

  const addAdFormListeners = () => {
    guestNumberSelect.addEventListener(`change`, validateGuestNumber);
    roomTypeSelect.addEventListener(`change`, validateRoomMinPrice);
    timeInSelect.addEventListener(`change`, validateTimeIn);
    timeOutSelect.addEventListener(`change`, validateTimeOut);
  };

  window.form = {
    adForm,
    adFormFieldsets,
    fillAddressField,
    addAdFormListeners
  };
})();
