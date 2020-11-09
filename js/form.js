'use strict';

(() => {
  const ROOM_TYPE_PRICE_MAPPING = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0
  };
  const adForm = document.querySelector(`.ad-form`);
  const adFormAddressField = adForm.querySelector(`#address`);
  const adFormReset = adForm.querySelector(`.ad-form__reset`);
  const guestNumberSelect = adForm.querySelector(`#capacity`);
  const roomNumberSelect = adForm.querySelector(`#room_number`);
  const roomTypeSelect = adForm.querySelector(`#type`);
  const roomPriceSelect = adForm.querySelector(`#price`);
  const timeInSelect = adForm.querySelector(`#timein`);
  const timeOutSelect = adForm.querySelector(`#timeout`);

  const fillAddressField = () => {
    adFormAddressField.value = window.mainPin.getPointerPosition();
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

  const resetAdForm = () => {
    window.pins.remove();
    window.card.remove();
    window.mainPin.resetPosition();
    validateRoomMinPrice();
    adForm.reset();
    window.main.deactivatePage();
  };

  const onSubmitSuccess = (message) => {
    window.message.success(message);
    resetAdForm();
  };

  const submitAdForm = (evt) => {
    const formData = new FormData(adForm);
    window.request.upload(formData, onSubmitSuccess, window.message.error);
    evt.preventDefault();
  };

  const addAdFormListeners = () => {
    adForm.addEventListener(`submit`, submitAdForm);
    guestNumberSelect.addEventListener(`change`, validateGuestNumber);
    roomTypeSelect.addEventListener(`change`, validateRoomMinPrice);
    timeInSelect.addEventListener(`change`, validateTimeIn);
    timeOutSelect.addEventListener(`change`, validateTimeOut);
    adFormReset.addEventListener(`click`, resetAdForm);
  };

  window.form = {
    'fillAddressField': fillAddressField,
    'addAdFormListeners': addAdFormListeners,
    'resetAdForm': resetAdForm
  };
})();
