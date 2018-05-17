'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports['default'] = withRouter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function withRouter(ComposedComponent) {
  var displayName = (0, _utils.getDisplayName)(ComposedComponent);

  var WithRouteWrapper = function (_Component) {
    (0, _inherits3['default'])(WithRouteWrapper, _Component);

    function WithRouteWrapper() {
      (0, _classCallCheck3['default'])(this, WithRouteWrapper);
      return (0, _possibleConstructorReturn3['default'])(this, _Component.apply(this, arguments));
    }

    WithRouteWrapper.prototype.render = function render() {
      var props = (0, _extends3['default'])({
        router: this.context.router
      }, this.props);

      return _react2['default'].createElement(ComposedComponent, props);
    };

    return WithRouteWrapper;
  }(_react.Component);

  WithRouteWrapper.contextTypes = {
    router: _propTypes2['default'].object
  };
  WithRouteWrapper.displayName = 'withRoute(' + displayName + ')';


  return (0, _hoistNonReactStatics2['default'])(WithRouteWrapper, ComposedComponent);
}