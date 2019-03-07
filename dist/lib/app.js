"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createUrl = createUrl;
exports.Container = exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

var _router = require("./router");

var App =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(App, _Component);

  function App() {
    return _Component.apply(this, arguments) || this;
  }

  App.getInitialProps =
  /*#__PURE__*/
  function () {
    var _getInitialProps = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref) {
      var Component, router, ctx, pageProps;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Component = _ref.Component, router = _ref.router, ctx = _ref.ctx;
              _context.next = 3;
              return (0, _utils.loadGetInitialProps)(Component, ctx);

            case 3:
              pageProps = _context.sent;
              return _context.abrupt("return", {
                pageProps: pageProps
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getInitialProps(_x) {
      return _getInitialProps.apply(this, arguments);
    }

    return getInitialProps;
  }();

  var _proto = App.prototype;

  _proto.getChildContext = function getChildContext() {
    var headManager = this.props.headManager;
    return {
      headManager: headManager,
      router: (0, _router.makePublicRouterInstance)(this.props.router)
    };
  } // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`. This is now deprecated.
  ;

  _proto.componentDidCatch = function componentDidCatch(err) {
    throw err;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        router = _this$props.router,
        Component = _this$props.Component,
        pageProps = _this$props.pageProps;
    var url = createUrl(router);
    return _react["default"].createElement(Container, null, _react["default"].createElement(Component, (0, _extends2["default"])({}, pageProps, {
      url: url
    })));
  };

  return App;
}(_react.Component);

exports["default"] = App;
(0, _defineProperty2["default"])(App, "childContextTypes", {
  headManager: _propTypes["default"].object,
  router: _propTypes["default"].object
});

var Container =
/*#__PURE__*/
function (_Component2) {
  (0, _inheritsLoose2["default"])(Container, _Component2);

  function Container() {
    return _Component2.apply(this, arguments) || this;
  }

  var _proto2 = Container.prototype;

  _proto2.componentDidMount = function componentDidMount() {
    this.scrollToHash();
  };

  _proto2.componentDidUpdate = function componentDidUpdate() {
    this.scrollToHash();
  };

  _proto2.scrollToHash = function scrollToHash() {
    var hash = window.location.hash;
    hash = hash ? hash.substring(1) : false;
    if (!hash) return;
    var el = document.getElementById(hash);
    if (!el) return; // If we call scrollIntoView() in here without a setTimeout
    // it won't scroll properly.

    setTimeout(function () {
      return el.scrollIntoView();
    }, 0);
  };

  _proto2.render = function render() {
    return this.props.children;
  };

  return Container;
}(_react.Component);

exports.Container = Container;
var warnUrl = (0, _utils.execOnce)(function () {
  if (process.env.NODE_ENV !== 'production') {
    console.error("Warning: the 'url' property is deprecated. https://err.sh/zeit/next.js/url-deprecated");
  }
});

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  var pathname = router.pathname,
      asPath = router.asPath,
      query = router.query;
  return {
    get query() {
      warnUrl();
      return query;
    },

    get pathname() {
      warnUrl();
      return pathname;
    },

    get asPath() {
      warnUrl();
      return asPath;
    },

    back: function back() {
      warnUrl();
      router.back();
    },
    push: function push(url, as) {
      warnUrl();
      return router.push(url, as);
    },
    pushTo: function pushTo(href, as) {
      warnUrl();
      var pushRoute = as ? href : null;
      var pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: function replace(url, as) {
      warnUrl();
      return router.replace(url, as);
    },
    replaceTo: function replaceTo(href, as) {
      warnUrl();
      var replaceRoute = as ? href : null;
      var replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}