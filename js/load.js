'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const TIMEOUT_IN_MS = 10000;

  window.load = (onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      switch (xhr.status) {
        case 200:
          window.data.save(xhr.response);
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

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };

})();
