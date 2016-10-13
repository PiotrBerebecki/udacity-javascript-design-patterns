'use strict';

console.clear();

(function () {

  /* ======== Model ======== */

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

  /* ======== Controller ======== */

  var controller = {
    init: function init() {
      model.init();
      view.initCatSelector();
      view.initCatDisplay();
      view.initAdmin();
    },

    updateCurrentlyDisplayedCat: function updateCurrentlyDisplayedCat(event) {
      model.currentlyDisplayedCat = Number(event.target.value);
    },

    addOneClick: function addOneClick() {
      model.catsData[model.currentlyDisplayedCat].clickCount++;
    },

    updateCatData: function updateCatData(name, imageUrl, clickCount) {
      model.catsData[model.currentlyDisplayedCat] = { name: name, imageUrl: imageUrl, clickCount: clickCount };
      view.renderCatDisplay();
      view.updateNameInOptionSelection(name);
    }
  };

  /* ======== View ======== */

  var view = {
    initCatSelector: function initCatSelector() {
      var _this = this;

      this.rootElement = document.getElementById('root-element');
      var selectElement = document.createElement('select');

      selectElement.addEventListener('change', function (event) {
        controller.updateCurrentlyDisplayedCat(event);
        _this.renderCatDisplay();
        _this.prefillAdminForm();
      });

      model.catsData.forEach(function (cat, index) {
        var optionElement = document.createElement('option');
        optionElement.textContent = cat.name;
        optionElement.value = index;
        selectElement.appendChild(optionElement);
      });

      this.rootElement.appendChild(selectElement);
    },

    updateNameInOptionSelection: function updateNameInOptionSelection(name) {
      var currentSelection = document.getElementsByTagName('select')[0].childNodes[model.currentlyDisplayedCat];
      currentSelection.textContent = name;
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

      this.catImageElement.addEventListener('click', function (event) {
        controller.addOneClick();
        _this2.renderClickCount();
        _this2.prefillAdminForm('imageWasClicked');
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
      this.renderClickCount();
    },

    renderClickCount: function renderClickCount() {
      this.clickCounterElement.textContent = model.catsData[model.currentlyDisplayedCat].clickCount == 0 ? 'Click me' : model.catsData[model.currentlyDisplayedCat].clickCount + ' clicks';
    },

    initAdmin: function initAdmin() {
      var _this3 = this;

      // Keep track whether the admin form is shown
      this.isAdminFormShown = false;

      // Admin button
      var adminButtonElement = document.createElement('button');
      adminButtonElement.textContent = 'Admin';
      this.rootElement.appendChild(adminButtonElement);

      // Show or hide admin form
      adminButtonElement.addEventListener('click', function () {
        _this3.isAdminFormShown = !_this3.isAdminFormShown;
        _this3.showAdminForm();
      });

      // Admin form
      var adminFormWrapper = document.createElement('div');
      adminFormWrapper.className = 'admin-form-wrapper';

      this.adminForm = document.createElement('form');

      var adminNameLabel = document.createElement('label');
      var adminImageUrlLabel = document.createElement('label');
      var adminClickCountLabel = document.createElement('label');

      this.adminNameInput = document.createElement('input');
      this.adminImageUrlInput = document.createElement('input');
      this.adminClickCountInput = document.createElement('input');

      adminNameLabel.textContent = 'Name';
      adminImageUrlLabel.textContent = 'Image URL';
      adminClickCountLabel.textContent = 'Number of clicks';

      this.adminNameInput.name = 'name';
      this.adminImageUrlInput.name = 'imageUrl';
      this.adminClickCountInput.name = 'clickCount';

      this.adminForm.appendChild(adminNameLabel);
      this.adminForm.appendChild(this.adminNameInput);

      this.adminForm.appendChild(adminImageUrlLabel);
      this.adminForm.appendChild(this.adminImageUrlInput);

      this.adminForm.appendChild(adminClickCountLabel);
      this.adminForm.appendChild(this.adminClickCountInput);

      this.adminFormSubmit = document.createElement('input');
      this.adminFormSubmit.type = 'submit';
      this.adminFormSubmit.value = 'Save';
      this.adminForm.appendChild(this.adminFormSubmit);

      this.adminForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = e.target.name.value;
        var imageUrl = e.target.imageUrl.value;
        var clickCount = e.target.clickCount.value;

        if (name && clickCount && imageUrl && !isNaN(clickCount) && Math.floor(clickCount) == Math.abs(clickCount)) {
          controller.updateCatData(name, imageUrl, clickCount);
        } else {
          alert('Please enter valid values');
        }
      });

      adminFormWrapper.appendChild(this.adminForm);
      this.rootElement.appendChild(adminFormWrapper);
      this.showAdminForm();
    },

    showAdminForm: function showAdminForm() {
      if (this.isAdminFormShown) {
        this.adminForm.className = 'admin-form';
        this.prefillAdminForm();
      } else {
        this.adminForm.className = 'hide';
      }
    },

    prefillAdminForm: function prefillAdminForm(eventType) {
      if (eventType !== 'imageWasClicked') {
        this.adminNameInput.value = model.catsData[model.currentlyDisplayedCat].name;
        this.adminImageUrlInput.value = model.catsData[model.currentlyDisplayedCat].imageUrl;
      }
      this.adminClickCountInput.value = model.catsData[model.currentlyDisplayedCat].clickCount;
    }
  };

  controller.init();
})();