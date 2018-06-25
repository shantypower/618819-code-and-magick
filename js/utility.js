'use strict';

(function () {
  window.getRandomArrowElement = function (arr) {
    var randomElementIndex = Math.floor(Math.random() * arr.length);
    return arr[randomElementIndex];
  };
})();
