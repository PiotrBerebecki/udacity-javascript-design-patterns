'use strict';

console.clear();

(function () {

  // Set up initial cat data
  var currentlyDisplayedCat = 0;

  var catsData = [{
    id: 0, name: 'Kitty', clickCount: 0,
    imageUrl: 'https://placekitten.com/200/300'
  }, {
    id: 1, name: 'Bella', clickCount: 0,
    imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-8.jpg'
  }, {
    id: 2, name: 'Max', clickCount: 0,
    imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-6.jpg'
  }, {
    id: 3, name: 'Sofia', clickCount: 0,
    imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-10.jpg'
  }, {
    id: 4, name: 'Clark', clickCount: 0,
    imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-1.jpg'
  }];

  // Select root element
  var rootElement = document.getElementById('root-element');

  // Setup select form
  var selectElement = document.createElement('select');
  selectElement.addEventListener('change', function (event) {
    currentlyDisplayedCat = Number(event.target.value);
    renderCat(currentlyDisplayedCat);
  });

  rootElement.appendChild(selectElement);

  // Set up options for the select form
  catsData.forEach(function (cat, index) {
    var optionElement = document.createElement('option');
    optionElement.textContent = cat.name;
    optionElement.value = index;
    selectElement.appendChild(optionElement);
  });

  // Set up cat display area
  var catWrapperElement = document.createElement('div');
  var catNameElement = document.createElement('h3');
  var catImageElement = document.createElement('img');
  var clickCounterElement = document.createElement('h3');

  catWrapperElement.className = 'cat-wrapper';
  catNameElement.className = 'cat-name';
  catImageElement.className = 'cat-image';
  clickCounterElement.className = 'click-counter';

  catWrapperElement.appendChild(catNameElement);
  catWrapperElement.appendChild(catImageElement);
  catWrapperElement.appendChild(clickCounterElement);

  rootElement.appendChild(catWrapperElement);

  renderCat(currentlyDisplayedCat);

  function renderCat(index) {
    catNameElement.textContent = catsData[index].name;
    catImageElement.src = catsData[index].imageUrl;
    clickCounterElement.textContent = catsData[index].clickCount;
  };

  catImageElement.addEventListener('click', function () {
    catsData[currentlyDisplayedCat].clickCount = catsData[currentlyDisplayedCat].clickCount + 1;
    clickCounterElement.textContent = catsData[currentlyDisplayedCat].clickCount;
  });
})();