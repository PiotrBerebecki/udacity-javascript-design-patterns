'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

console.clear();

(function () {

  // Set up initial cat data
  var catsData = [{
    id: 0, name: 'Kitty', clickCount: 0,
    imageUrl: 'https://placekitten.com/200/300'
  }, {
    id: 1, name: 'Oliver', clickCount: 0,
    imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-8.jpg'
  }];

  // Select root element
  var rootElement = document.getElementById('root-element');

  // Set up DOM
  catsData.forEach(function (cat, index) {
    var catWrapperElement = document.createElement('div');
    var catNameElement = document.createElement('h3');
    var catImageElement = document.createElement('img');
    var clickCounterElement = document.createElement('h3');

    catWrapperElement.className = 'cat-wrapper';
    catNameElement.className = 'cat-name';
    catImageElement.className = 'cat-image';
    clickCounterElement.className = 'click-counter';

    catNameElement.textContent = catsData[index].name;
    catImageElement.src = catsData[index].imageUrl;

    catImageElement.addEventListener('click', function () {
      catsData[index] = _extends({}, catsData[index], { clickCount: ++catsData[index].clickCount });
      clickCounterElement.textContent = catsData[index].clickCount;
    }, false);

    catWrapperElement.appendChild(catNameElement);
    catWrapperElement.appendChild(catImageElement);
    catWrapperElement.appendChild(clickCounterElement);

    rootElement.appendChild(catWrapperElement);
  });
})();