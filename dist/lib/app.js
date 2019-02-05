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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowEquals = require('./shallow-equals');

var _shallowEquals2 = _interopRequireDefault(_shallowEquals);

var _utils = require('./utils');

var _router = require('./router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      hasError: null
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  App.prototype.getChildContext = function getChildContext() {
    var headManager = this.props.headManager;

    return {
      headManager: headManager,
      router: (0, _router.makePublicRouterInstance)(this.props.router)
    };
  };

  App.prototype.componentDidCatch = function componentDidCatch(error, info) {
    error.stack = error.stack + '\n\n' + info.componentStack;
    window.next.renderError(error);
    this.setState({ hasError: true });
  };

  App.prototype.render = function render() {
    if (this.state.hasError) return null;

    var _props = this.props,
        Component = _props.Component,
        props = _props.props,
        hash = _props.hash,
        router = _props.router;

    var url = createUrl(router);
    // If there no component exported we can't proceed.
    // We'll tackle that here.
    if (typeof Component !== 'function') {
      throw new Error('The default export is not a React Component in page: "' + url.pathname + '"');
    }
    var containerProps = { Component: Component, props: props, hash: hash, router: router, url: url };

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(Container, containerProps)
    );
  };

  return App;
}(_react.Component);

App.childContextTypes = {
  headManager: _propTypes2.default.object,
  router: _propTypes2.default.object
};
exports.default = App;

var Container = function (_Component2) {
  (0, _inherits3.default)(Container, _Component2);

  function Container() {
    (0, _classCallCheck3.default)(this, Container);
    return (0, _possibleConstructorReturn3.default)(this, _Component2.apply(this, arguments));
  }

  Container.prototype.componentDidMount = function componentDidMount() {
    this.scrollToHash();
  };

  Container.prototype.componentDidUpdate = function componentDidUpdate() {
    this.scrollToHash();
  };

  Container.prototype.scrollToHash = function scrollToHash() {
    var hash = this.props.hash;

    if (!hash) return;

    var el = document.getElementById(hash);
    if (!el) return;

    // If we call scrollIntoView() in here without a setTimeout
    // it won't scroll properly.
    setTimeout(function () {
      return el.scrollIntoView();
    }, 0);
  };

  Container.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    // need this check not to rerender component which has already thrown an error
    return !(0, _shallowEquals2.default)(this.props, nextProps);
  };

  Container.prototype.render = function render() {
    var _props2 = this.props,
        Component = _props2.Component,
        props = _props2.props,
        url = _props2.url;


    if (process.env.NODE_ENV === 'production') {
      return _react2.default.createElement(Component, (0, _extends3.default)({}, props, { url: url }));
    } else {
      var ErrorDebug = require('./error-debug').default;

      var _require = require('react-hot-loader'),
          AppContainer = _require.AppContainer;

      // includes AppContainer which bypasses shouldComponentUpdate method
      // https://github.com/gaearon/react-hot-loader/issues/442


      return _react2.default.createElement(
        AppContainer,
        { warnings: false, errorReporter: ErrorDebug },
        _react2.default.createElement(Component, (0, _extends3.default)({}, props, { url: url }))
      );
    }
  };

  return Container;
}(_react.Component);

function createUrl(router) {
  return {
    query: router.query,
    pathname: router.pathname,
    asPath: router.asPath,
    back: function back() {
      (0, _utils.warn)('Warning: \'url.back()\' is deprecated. Use "window.history.back()"');
      router.back();
    },
    push: function push(url, as) {
      (0, _utils.warn)('Warning: \'url.push()\' is deprecated. Use "next/router" APIs.');
      return router.push(url, as);
    },
    pushTo: function pushTo(href, as) {
      (0, _utils.warn)('Warning: \'url.pushTo()\' is deprecated. Use "next/router" APIs.');
      var pushRoute = as ? href : null;
      var pushUrl = as || href;

      return router.push(pushRoute, pushUrl);
    },
    replace: function replace(url, as) {
      (0, _utils.warn)('Warning: \'url.replace()\' is deprecated. Use "next/router" APIs.');
      return router.replace(url, as);
    },
    replaceTo: function replaceTo(href, as) {
      (0, _utils.warn)('Warning: \'url.replaceTo()\' is deprecated. Use "next/router" APIs.');
      var replaceRoute = as ? href : null;
      var replaceUrl = as || href;

      return router.replace(replaceRoute, replaceUrl);
    }
  };
}