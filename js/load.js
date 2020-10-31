'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const TIMEOUT_IN_MS = 61;

  window.load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          onError(`Неверный запрос`);
          break;
        case 401:
          onError(`Ошибка авторизации`);
          break;
        case 404:
          onError(`Ничего не найдено`);
          break;

        default:
          onError(`Cтатус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
