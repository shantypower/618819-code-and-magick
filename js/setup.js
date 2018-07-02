'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballColor = setup.querySelector('.setup-fireball-wrap');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var similarWizardList = document.querySelector('.setup-similar');
  similarWizardList.classList.remove('hidden');

  var changeWizardDetailColor = function (wizardElement, arrColor, colorStyleParametr, inputName) {
    wizardElement.style[colorStyleParametr] = window.getRandomArrowElement(arrColor);
    inputName.value = wizardElement.style[colorStyleParametr];
  };

  var createWizard = function (node) {
    var cloneWizardElement = similarWizardTemplate.cloneNode(true);
    cloneWizardElement.querySelector('.setup-similar-label').textContent = node.name;
    cloneWizardElement.querySelector('.wizard-coat').style.fill = node.colorCoat;
    cloneWizardElement.querySelector('.wizard-eyes').style.fill = node.colorEyes;
    wizardCoat.addEventListener('click', function () {
      changeWizardDetailColor(wizardCoat, window.constants.WIZARD_COATS, 'fill', inputCoatColor);
    });
    wizardEyes.addEventListener('click', function () {
      changeWizardDetailColor(wizardEyes, window.constants.WIZARD_EYES, 'fill', inputEyesColor);
    });
    setupFireballColor.addEventListener('click', function () {
      changeWizardDetailColor(setupFireballColor, window.constants.FIREBALL_COLORS, 'background-color', inputFireballColor);
    });
    return cloneWizardElement;
  };

  var renderWizard = function (node) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {

      fragment.appendChild(createWizard(window.getRandomArrowElement(node)));
    }
    similarListElement.appendChild(fragment);
    return fragment;
  };

  var successHandler = function (data) {
    renderWizard(data);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; margin-left: -200px; background-color: #fefefe; border-radius: 10px; box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);';
    node.style.position = 'fixed';
    node.style.top = '30px';
    node.style.left = '50%';
    node.style.width = '400px';
    node.style.minHeight = '150px';
    node.style.padding = '18px 25px 25px 25px';
    node.style.fontSize = '15px';
    node.style.color = 'red';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.setup = {
    errorHandler: errorHandler,
    successHandler: successHandler
  };
})();
