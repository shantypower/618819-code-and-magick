'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var getRandomArrowElement = function (arr) {
  var randomElementIndex = Math.floor(Math.random() * arr.length);
  return arr[randomElementIndex];
};

var getWizardsImage = function (arrNames, arrSurnames, arrCoats, arrEyes) {
  var randomName = getRandomArrowElement(arrNames) + ' ' + getRandomArrowElement(arrSurnames);
  var randomCoat = getRandomArrowElement(arrCoats);
  var randomEyes = getRandomArrowElement(arrEyes);
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

var wizards = getWizardsGroup(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATS, WIZARD_EYES);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');