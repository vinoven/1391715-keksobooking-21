'use strict';

const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;
const StatusCode = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

const createRequest = (method, URL, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(method, URL);

  xhr.addEventListener(`load`, () => {
    switch (xhr.status) {
      case StatusCode.SUCCESS:
        onSuccess(xhr.response);
        break;

      case StatusCode.BAD_REQUEST:
        onError(`Неверный запрос`);
        break;
      case StatusCode.UNAUTHORIZED:
        onError(`Ошибка авторизации`);
        break;
      case StatusCode.NOT_FOUND:
        onError(`Ничего не найдено`);
        break;

      default:
        onError(`Cтатус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
  });

  return xhr;
};

const loadData = (onSuccess, onError) => {
  const xhr = createRequest(`GET`, LOAD_URL, onSuccess, onError);

  xhr.send();
};

const uploadData = (data, onSuccess, onError) => {
  const xhr = createRequest(`POST`, UPLOAD_URL, onSuccess, onError);

  xhr.send(data);
};

window.request = {
  'load': loadData,
  'upload': uploadData
};
