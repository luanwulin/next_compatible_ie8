"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var ErrorBoundary =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ErrorBoundary.prototype;

  _proto.componentDidCatch = function componentDidCatch(error, info) {
    var onError = this.props.onError; // onError is required

    onError(error, info);
  };

  _proto.render = function render() {
    var children = this.props.children;
    return React.Children.only(children);
  };

  return ErrorBoundary;
}(React.Component);

var _default = ErrorBoundary;
exports["default"] = _default;