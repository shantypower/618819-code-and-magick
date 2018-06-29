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

  var getWizardsImage = function (data) {
    var randomName = data.name;
    var randomCoat = data.colorCoat;
    var randomEyes = data.colorEyes;
    var wizardsImage = {};

    wizardsImage.name = randomName;
    wizardsImage.coatColor = randomCoat;
    wizardsImage.eyesColor = randomEyes;
    return wizardsImage;
  };

  var getWizardsGroup = function (data) {
    var wizardsImages = [];
    for (var i = 0; i <= 3; i++) {
      wizardsImages[i] = getWizardsImage(data);
      renderWizard(data[i]);
    }
    return wizardsImages;
  };

  var createWizard = function (node) {
    var cloneWizardElement = node.cloneNode(true);
    cloneWizardElement.querySelector('.setup-similar-label').textContent = node.name;
    cloneWizardElement.querySelector('.wizard-coat').style.fill = node.coatColor;
    cloneWizardElement.querySelector('.wizard-eyes').style.fill = node.eyesColor;
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
    fragment.appendChild(createWizard(node));
    similarListElement.appendChild(fragment);
    return fragment;
  };

  var onLoad = function (data) {
    window.getRandomArrowElement(data);
    setup.querySelector('.setup-similar').classList.remove('hidden');
    var wizards = getWizardsGroup(data);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
   // node.style = 'z-index: 100; margin-left: -50px auto; text-align: center; background-color: red; width: 100%;';
    node.style = 'z-index: 100; text-align: center; margin-left: -200px; background-color: #fefefe; border-radius: 10px; box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);';
    node.style.position = 'fixed';
    node.style.top = '30px';
    node.style.left = '50%';
    node.style.width = '400px';
    node.style.height = '150px';
    node.style.padding = '18px 25px 25px 25px';
    node.style.fontSize = '40px';
    node.style.color = 'red';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

window.setup = {
  onError: onError,
  onLoad: onLoad
}
})();
