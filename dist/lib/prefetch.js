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

exports.prefetch = prefetch;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var warnImperativePrefetch = (0, _utils.execOnce)(function () {
  var message = '> You are using deprecated "next/prefetch". It will be removed with Next.js 2.0.\n' + '> Use "Router.prefetch(href)" instead.';
  (0, _utils.warn)(message);
});

var wantLinkPrefetch = (0, _utils.execOnce)(function () {
  var message = '> You are using deprecated "next/prefetch". It will be removed with Next.js 2.0.\n' + '> Use "<Link prefetch />" instead.';
  (0, _utils.warn)(message);
});

function prefetch(href) {
  warnImperativePrefetch();
  return _router2['default'].prefetch(href);
}

var LinkPrefetch = function (_React$Component) {
  (0, _inherits3['default'])(LinkPrefetch, _React$Component);

  function LinkPrefetch() {
    (0, _classCallCheck3['default'])(this, LinkPrefetch);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  LinkPrefetch.prototype.render = function render() {
    wantLinkPrefetch();
    var props = (0, _extends3['default'])({}, this.props, {
      prefetch: this.props.prefetch !== false
    });

    return _react2['default'].createElement(_link2['default'], props);
  };

  return LinkPrefetch;
}(_react2['default'].Component);

exports['default'] = LinkPrefetch;