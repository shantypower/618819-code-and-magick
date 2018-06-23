'use strict';
/*
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];*/

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
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
/////////////////// dialog.js
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
/////////////////////
var changeWizardDetailColor = function (wizardElement, arrColor, colorStyleParametr, inputName) {
  wizardElement.style[colorStyleParametr] = window.getRandomArrowElement(arrColor);
  inputName.value = wizardElement.style[colorStyleParametr];
};
/*
var getRandomArrowElement = function (arr) {
  var randomElementIndex = Math.floor(Math.random() * arr.length);
  return arr[randomElementIndex];
};*/

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
