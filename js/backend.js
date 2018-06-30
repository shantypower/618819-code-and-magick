'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/code-and-magick/data';
  var URL = 'https://js.dump.academy/code-and-magick';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  var load = function (onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.setup.onLoad(xhr.response);
      } else {
        window.setup.onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      window.setup.onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      window.setup.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.constants.LOAD_TIME;
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();


    xhr.responseType = 'json';
    xhr.timeout = window.constants.LOAD_TIME;


    xhr.addEventListener('load', function (evt) {
      try {
        if (evt.target.status === window.constants.SUCCESS_STATUS) {
          window.setup.onLoad();
        } else {
          window.setup.onError('Статус загрузки ' + evt.target.status);
        }
      } catch (err) {
        window.setup.onError('Ошибка - ' + err.name + ' : ' + err.message);
      }
    });

    xhr.addEventListener('timeout', function (evt) {
      window.setup.onError('Загрузка не успела произойти за ' + evt.target.timeout + 'ms');
    });

    xhr.addEventListener('error', function () {
      window.setup.onError('Произошла ошибка загрузки данных');
    });

    xhr.open('POST', URL);

    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
