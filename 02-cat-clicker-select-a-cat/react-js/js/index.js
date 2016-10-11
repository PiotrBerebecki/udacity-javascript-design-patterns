'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.clear();

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.handleCatClick = _this.handleCatClick.bind(_this);
    _this.handleCatSelection = _this.handleCatSelection.bind(_this);
    _this.state = {
      currentlyDisplayedCat: 0,
      catsData: [{
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
      }]
    };
    return _this;
  }

  App.prototype.handleCatSelection = function handleCatSelection(index) {
    this.setState({
      currentlyDisplayedCat: Number(index)
    });
  };

  App.prototype.handleCatClick = function handleCatClick(id) {
    var clickedId = Number(id);

    this.setState({
      catsData: [].concat(this.state.catsData.slice(0, clickedId), [_extends({}, this.state.catsData[clickedId], {
        clickCount: this.state.catsData[clickedId].clickCount + 1 })], this.state.catsData.slice(clickedId + 1))
    });
  };

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(CatSelectionForm, { catsData: this.state.catsData,
        onCatSelection: this.handleCatSelection }),
      React.createElement(
        'div',
        { className: 'cat-display-area-container' },
        React.createElement(CatDisplayArea, { catData: this.state.catsData[this.state.currentlyDisplayedCat],
          onCatClick: this.handleCatClick })
      )
    );
  };

  return App;
}(React.Component);

var CatSelectionForm = function (_React$Component2) {
  _inherits(CatSelectionForm, _React$Component2);

  function CatSelectionForm() {
    _classCallCheck(this, CatSelectionForm);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  CatSelectionForm.prototype.handleChange = function handleChange(e) {
    console.log(e.target);
    this.props.onCatSelection(e.target.value);
  };

  CatSelectionForm.prototype.render = function render() {
    var renderOptions = this.props.catsData.map(function (cat, index) {
      return React.createElement(
        'option',
        { key: index, value: index },
        cat.name
      );
    });

    return React.createElement(
      'select',
      { onChange: this.handleChange },
      renderOptions
    );
  };

  return CatSelectionForm;
}(React.Component);

var CatDisplayArea = function (_React$Component3) {
  _inherits(CatDisplayArea, _React$Component3);

  function CatDisplayArea() {
    _classCallCheck(this, CatDisplayArea);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this));

    _this3.handleClick = _this3.handleClick.bind(_this3);
    return _this3;
  }

  CatDisplayArea.prototype.handleClick = function handleClick(event) {
    this.props.onCatClick(event.target.id);
  };

  CatDisplayArea.prototype.render = function render() {
    var catData = this.props.catData;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h3',
        { className: 'cat-name' },
        catData.name
      ),
      React.createElement('img', { className: 'cat-image',
        src: catData.imageUrl,
        id: catData.id,
        onClick: this.handleClick }),
      React.createElement(
        'h3',
        { className: 'cat-counter' },
        catData.clickCount
      )
    );
  };

  return CatDisplayArea;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));