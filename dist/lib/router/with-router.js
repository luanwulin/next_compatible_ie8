"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = withRouter;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _utils = require("../utils");

function withRouter(ComposedComponent) {
  var displayName = (0, _utils.getDisplayName)(ComposedComponent);

  var WithRouteWrapper =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2["default"])(WithRouteWrapper, _Component);

    function WithRouteWrapper() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = WithRouteWrapper.prototype;

    _proto.render = function render() {
      var props = (0, _objectSpread2["default"])({
        router: this.context.router
      }, this.props);
      return _react["default"].createElement(ComposedComponent, props);
    };

    return WithRouteWrapper;
  }(_react.Component);

  (0, _defineProperty2["default"])(WithRouteWrapper, "contextTypes", {
    router: _propTypes["default"].object
  });
  (0, _defineProperty2["default"])(WithRouteWrapper, "displayName", "withRouter(" + displayName + ")");
  return (0, _hoistNonReactStatics["default"])(WithRouteWrapper, ComposedComponent);
}