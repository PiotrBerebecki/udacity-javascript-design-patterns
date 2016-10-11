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

    _this.handleClick = _this.handleClick.bind(_this);
    _this.state = {
      catsData: [{
        id: 0, name: 'Kitty', clickCount: 0,
        imageUrl: 'https://placekitten.com/200/300'
      }, {
        id: 1, name: 'Bella', clickCount: 0,
        imageUrl: 'http://lorempixel.com/output/cats-h-c-200-300-8.jpg'
      }]
    };
    return _this;
  }

  App.prototype.handleClick = function handleClick(event) {
    var clickedId = Number(event.target.id);

    this.setState({
      catsData: [].concat(this.state.catsData.slice(0, clickedId), [_extends({}, this.state.catsData[clickedId], {
        clickCount: this.state.catsData[clickedId].clickCount + 1 })], this.state.catsData.slice(clickedId + 1))
    });
  };

  App.prototype.render = function render() {
    var _this2 = this;

    var renderCats = this.state.catsData.map(function (cat, index) {
      return React.createElement(
        'div',
        { key: index, className: 'cat-wrapper' },
        React.createElement(
          'h3',
          { className: 'cat-name' },
          cat.name
        ),
        React.createElement('img', { className: 'cat-image',
          src: cat.imageUrl,
          id: index,
          onClick: _this2.handleClick }),
        React.createElement(
          'h3',
          { className: 'cat-counter' },
          cat.clickCount
        )
      );
    });

    return React.createElement(
      'div',
      { className: 'cats-container' },
      renderCats
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));