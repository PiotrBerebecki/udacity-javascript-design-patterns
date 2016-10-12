'use strict';

console.clear();

(function () {

  var model = {
    init: function init() {
      this.currentlyDisplayedCat = 0;
      this.catsData = [{
        id: 0, name: 'Kitty', clickCount: 0,
        imageUrl: 'https://placekitten.com/200/300'
      }, {
        id: 1, name: 'Oliver', clickCount: 0,
        imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-8.jpg'
      }, {
        id: 2, name: 'Max', clickCount: 0,
        imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-6.jpg'
      }, {
        id: 3, name: 'Bella', clickCount: 0,
        imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-10.jpg'
      }, {
        id: 4, name: 'Oscar', clickCount: 0,
        imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-1.jpg'
      }];
    }
  };

  var controller = {
    init: function init() {
      model.init();
      view.initCatSelector();
      view.initCatDisplay();
    },

    updateCurrentlyDisplayedCat: function updateCurrentlyDisplayedCat(event) {
      model.currentlyDisplayedCat = Number(event.target.value);
    },

    addOneClick: function addOneClick() {
      model.catsData[model.currentlyDisplayedCat].clickCount = model.catsData[model.currentlyDisplayedCat].clickCount + 1;
    }
  };

  var view = {
    initCatSelector: function initCatSelector() {
      var _this = this;

      this.rootElement = document.getElementById('root-element');
      var selectElement = document.createElement('select');

      selectElement.addEventListener('change', function (event) {
        controller.updateCurrentlyDisplayedCat(event);
        _this.renderCatDisplay();
      });

      model.catsData.forEach(function (cat, index) {
        var optionElement = document.createElement('option');
        optionElement.textContent = cat.name;
        optionElement.value = index;
        selectElement.appendChild(optionElement);
      });

      this.rootElement.appendChild(selectElement);
    },

    initCatDisplay: function initCatDisplay() {
      var _this2 = this;

      var catWrapperElement = document.createElement('div');
      this.catNameElement = document.createElement('h3');
      this.catImageElement = document.createElement('img');
      this.clickCounterElement = document.createElement('h3');

      catWrapperElement.className = 'cat-wrapper';
      this.catNameElement.className = 'cat-name';
      this.catImageElement.className = 'cat-image';
      this.clickCounterElement.className = 'click-counter';

      this.catImageElement.addEventListener('click', function () {
        controller.addOneClick();
        _this2.clickCounterElement.textContent = model.catsData[model.currentlyDisplayedCat].clickCount + ' clicks';
      });

      catWrapperElement.appendChild(this.catNameElement);
      catWrapperElement.appendChild(this.catImageElement);
      catWrapperElement.appendChild(this.clickCounterElement);

      this.rootElement.appendChild(catWrapperElement);

      this.renderCatDisplay();
    },

    renderCatDisplay: function renderCatDisplay() {
      this.catNameElement.textContent = model.catsData[model.currentlyDisplayedCat].name;
      this.catImageElement.src = model.catsData[model.currentlyDisplayedCat].imageUrl;
      this.clickCounterElement.textContent = model.catsData[model.currentlyDisplayedCat].clickCount === 0 ? 'Click me' : model.catsData[model.currentlyDisplayedCat].clickCount;
    }
  };

  controller.init();
})();