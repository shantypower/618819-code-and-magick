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

  var changeWizardDetailColor = function (wizardElement, arrColor, colorStyleParametr, inputName) {
    wizardElement.style[colorStyleParametr] = window.getRandomArrowElement(arrColor);
    inputName.value = wizardElement.style[colorStyleParametr];
  };

  var getWizardsImage = function (arrNames, arrSurnames, arrCoats, arrEyes) {
    var randomName = window.getRandomArrowElement(arrNames) + ' ' + window.getRandomArrowElement(arrSurnames);
    var randomCoat = window.getRandomArrowElement(arrCoats);
    var randomEyes = window.getRandomArrowElement(arrEyes);
    var wizardsImage = {};

    wizardsImage.name = randomName;
    wizardsImage.coatColor = randomCoat;
    wizardsImage.eyesColor = randomEyes;
    return wizardsImage;
  };

  var getWizardsGroup = function (arrNames, arrSurnames, arrCoats, arrEyes) {
    var wizardsImages = [];
    for (var i = 0; i <= 3; i++) {
      wizardsImages[i] = getWizardsImage(arrNames, arrSurnames, arrCoats, arrEyes);
    }
    return wizardsImages;
  };

  var wizards = getWizardsGroup(window.constants.WIZARD_NAMES, window.constants.WIZARD_SURNAMES, window.constants.WIZARD_COATS, window.constants.WIZARD_EYES);

  var createWizard = function (node, wizard) {
    var cloneWizardElement = node.cloneNode(true);
    cloneWizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    cloneWizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    cloneWizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
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
    fragment.appendChild(createWizard(node, wizards));
    similarListElement.appendChild(fragment);
    return fragment;
  };

  for (var i = 0; i < wizards.length; i++) {
    renderWizard(createWizard(similarWizardTemplate, wizards[i]));
  }

})();
