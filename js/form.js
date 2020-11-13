'use strict';

const ROOM_TYPE_PRICE_MAPPING = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0
};
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const adForm = document.querySelector(`.ad-form`);
const adFormAddressField = adForm.querySelector(`#address`);
const adFormReset = adForm.querySelector(`.ad-form__reset`);
const guestNumberSelect = adForm.querySelector(`#capacity`);
const roomNumberSelect = adForm.querySelector(`#room_number`);
const roomTypeSelect = adForm.querySelector(`#type`);
const roomPriceSelect = adForm.querySelector(`#price`);
const timeInSelect = adForm.querySelector(`#timein`);
const timeOutSelect = adForm.querySelector(`#timeout`);
const adFormPhotoInput = adForm.querySelector(`#images`);
const adFormPhotoPreview = adForm.querySelector(`.ad-form__photo`);

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

const addAdFormPhoto = (src) => {
  adFormPhotoPreview.style.backgroundImage = `url(${src})`;
  adFormPhotoPreview.style.backgroundSize = `100% 100%`;
};

const onAdFormSubmit = (evt) => {
  submitAdForm(evt);
};

const onGusetSelectChange = () => {
  validateGuestNumber();
};

const onRoomTypeSelectChange = () => {
  validateRoomMinPrice();
};

const onTimeInSelectChange = () => {
  validateTimeIn();
};

const onTimeOutSelectChange = () => {
  validateTimeOut();
};

const onAdFormResetButtonClick = () => {
  resetAdForm();
};

const onAdFormPhotoInputChange = () => {
  window.fileChooser.process(adFormPhotoInput, FILE_TYPES, addAdFormPhoto);
};

const addAdFormListeners = () => {
  adForm.addEventListener(`submit`, onAdFormSubmit);
  guestNumberSelect.addEventListener(`change`, onGusetSelectChange);
  roomTypeSelect.addEventListener(`change`, onRoomTypeSelectChange);
  timeInSelect.addEventListener(`change`, onTimeInSelectChange);
  timeOutSelect.addEventListener(`change`, onTimeOutSelectChange);
  adFormReset.addEventListener(`click`, onAdFormResetButtonClick);
  adFormPhotoInput.addEventListener(`change`, onAdFormPhotoInputChange);
};

const removeAdFormListeners = () => {
  adForm.removeEventListener(`submit`, onAdFormSubmit);
  guestNumberSelect.removeEventListener(`change`, onGusetSelectChange);
  roomTypeSelect.removeEventListener(`change`, onRoomTypeSelectChange);
  timeInSelect.removeEventListener(`change`, onTimeInSelectChange);
  timeOutSelect.removeEventListener(`change`, onTimeOutSelectChange);
  adFormReset.removeEventListener(`click`, onAdFormResetButtonClick);
};

window.form = {
  'fillAddressField': fillAddressField,
  'addListeners': addAdFormListeners,
  'removeListeners': removeAdFormListeners
};
