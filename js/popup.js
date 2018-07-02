'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var form = document.querySelector('.setup-wizard-form');
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE && setupUserName !== evt.target) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.style = '';
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      closePopup();
    }
  });

  var onSubmitClick = function (evt) {
    evt.preventDefault();
    if (setupUserName.checkValidity()) {
      window.backend.save(new FormData(form), closePopup, window.setup.errorHandler);
    } else {
      window.setup.onError(setupUserName.validationMessage);
    }
  };

  form.addEventListener('submit', onSubmitClick);
})();
