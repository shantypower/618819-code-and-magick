'use strict';

// Создать функцию, генерирующую массив из 4 объектов.
// У каждого объекта войства генерируются случайным образом из готовых массивов:
//  - массив имен;
//  - масссв фамилий;
//( имя и фамилию склеивать в одно свойство объекта name);
//  - массив случайных цветов мантии - поле coatColor;
//  - массив случайных цветов глаз - для формирования поля eyesColor;
// Создать функцию генерации DOM-элементов с помощью шаблонизации.
//Написать функцию Вставки в эти элементы точечно контент на основании ранее созданного массива обЪектов - магов со случайными параметрами.
//Отрисуйте сгенерированные DOM-элементы в блок .setup-similar-list. Для вставки элементов используйте DocumentFragment.
//

var WIZARD_NAMES = ['Иван','Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон',
'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var wizards = [
  {
    name: WIZARD_NAMES[0],
    coatColor: 'rgb(241, 43, 107)'
  },
  {
    name: WIZARD_NAMES[1],
    coatColor: 'rgb(215, 210, 55)'
  },
  {
    name: WIZARD_NAMES[2],
    coatColor: 'rgb(101, 137, 164)'
  },
  {
    name: WIZARD_NAMES[3],
    coatColor: 'rgb(127, 127, 127)'
  }
];


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
