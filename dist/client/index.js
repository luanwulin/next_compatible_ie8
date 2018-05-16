'use strict';

exports.__esModule = true;
exports.renderError = exports.render = exports.emitter = exports.ErrorComponent = exports.router = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var render = exports.render = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(props) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(props.err && !props.err.ignore)) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return renderError(props.err);

          case 3:
            return _context2.abrupt('return');

          case 4:
            _context2.prev = 4;
            _context2.next = 7;
            return doRender(props);

          case 7:
            _context2.next = 15;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](4);

            if (!_context2.t0.abort) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt('return');

          case 13:
            _context2.next = 15;
            return renderError(_context2.t0);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 9]]);
  }));

  return function render(_x2) {
    return _ref7.apply(this, arguments);
  };
}();

var renderError = exports.renderError = function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(error) {
    var prod, errorMessage, initProps, _props;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            prod = process.env.NODE_ENV === 'production';

            _reactDom2.default.unmountComponentAtNode(appContainer);

            errorMessage = error.message + '\n' + error.stack;

            console.error(stripAnsi(errorMessage));

            if (!prod) {
              _context3.next = 12;
              break;
            }

            initProps = { err: error, pathname: pathname, query: query, asPath: asPath };
            _context3.next = 8;
            return (0, _utils.loadGetInitialProps)(ErrorComponent, initProps);

          case 8:
            _props = _context3.sent;

            renderReactElement((0, _react.createElement)(ErrorComponent, _props), errorContainer);
            _context3.next = 13;
            break;

          case 12:
            renderReactElement((0, _react.createElement)(ErrorDebugComponent, { error: error }), errorContainer);

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function renderError(_x3) {
    return _ref8.apply(this, arguments);
  };
}();

var doRender = function () {
  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref9) {
    var Component = _ref9.Component,
        props = _ref9.props,
        hash = _ref9.hash,
        err = _ref9.err,
        _ref9$emitter = _ref9.emitter,
        emitterProp = _ref9$emitter === undefined ? emitter : _ref9$emitter;

    var _router, _pathname, _query, _asPath, appProps;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!props && Component && Component !== ErrorComponent && lastAppProps.Component === ErrorComponent)) {
              _context4.next = 5;
              break;
            }

            _router = router, _pathname = _router.pathname, _query = _router.query, _asPath = _router.asPath;
            _context4.next = 4;
            return (0, _utils.loadGetInitialProps)(Component, { err: err, pathname: _pathname, query: _query, asPath: _asPath });

          case 4:
            props = _context4.sent;

          case 5:

            Component = Component || lastAppProps.Component;
            props = props || lastAppProps.props;

            appProps = { Component: Component, props: props, hash: hash, err: err, router: router, headManager: headManager };

            lastAppProps = appProps;

            emitterProp.emit('before-reactdom-render', { Component: Component, ErrorComponent: ErrorComponent, appProps: appProps });

            _reactDom2.default.unmountComponentAtNode(errorContainer);
            renderReactElement((0, _react.createElement)(_app2.default, appProps), appContainer);

            emitterProp.emit('after-reactdom-render', { Component: Component, ErrorComponent: ErrorComponent, appProps: appProps });

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function doRender(_x4) {
    return _ref10.apply(this, arguments);
  };
}();

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _headManager = require('./head-manager');

var _headManager2 = _interopRequireDefault(_headManager);

var _router2 = require('../lib/router');

var _EventEmitter = require('../lib/EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _app = require('../lib/app');

var _app2 = _interopRequireDefault(_app);

var _utils = require('../lib/utils');

var _pageLoader = require('../lib/page-loader');

var _pageLoader2 = _interopRequireDefault(_pageLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!window.Promise) {
  window.Promise = _promise2.default;
}

var _window = window,
    _window$__NEXT_DATA__ = _window.__NEXT_DATA__,
    props = _window$__NEXT_DATA__.props,
    err = _window$__NEXT_DATA__.err,
    pathname = _window$__NEXT_DATA__.pathname,
    query = _window$__NEXT_DATA__.query,
    buildId = _window$__NEXT_DATA__.buildId,
    chunks = _window$__NEXT_DATA__.chunks,
    assetPrefix = _window$__NEXT_DATA__.assetPrefix,
    location = _window.location;


var asPath = (0, _utils.getURL)();

var pageLoader = new _pageLoader2.default(buildId, assetPrefix);
window.__NEXT_LOADED_PAGES__.forEach(function (_ref) {
  var route = _ref.route,
      fn = _ref.fn;

  pageLoader.registerPage(route, fn);
});
delete window.__NEXT_LOADED_PAGES__;

window.__NEXT_LOADED_CHUNKS__.forEach(function (_ref2) {
  var chunkName = _ref2.chunkName,
      fn = _ref2.fn;

  pageLoader.registerChunk(chunkName, fn);
});
delete window.__NEXT_LOADED_CHUNKS__;

window.__NEXT_REGISTER_PAGE = pageLoader.registerPage.bind(pageLoader);
window.__NEXT_REGISTER_CHUNK = pageLoader.registerChunk.bind(pageLoader);

var headManager = new _headManager2.default();
var appContainer = document.getElementById('__next');
var errorContainer = document.getElementById('__next-error');

var lastAppProps = void 0;
var router = exports.router = void 0;
var ErrorComponent = exports.ErrorComponent = void 0;
var ErrorDebugComponent = void 0;
var Component = void 0;
var stripAnsi = function stripAnsi(s) {
  return s;
};

var emitter = exports.emitter = new _EventEmitter2.default();

exports.default = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      passedDebugComponent = _ref4.ErrorDebugComponent,
      passedStripAnsi = _ref4.stripAnsi;

  var _iterator, _isArray, _i, _ref5, chunkName, hash;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator = chunks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 1:
          if (!_isArray) {
            _context.next = 7;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt('break', 16);

        case 4:
          _ref5 = _iterator[_i++];
          _context.next = 11;
          break;

        case 7:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 10;
            break;
          }

          return _context.abrupt('break', 16);

        case 10:
          _ref5 = _i.value;

        case 11:
          chunkName = _ref5;
          _context.next = 14;
          return pageLoader.waitForChunk(chunkName);

        case 14:
          _context.next = 1;
          break;

        case 16:

          stripAnsi = passedStripAnsi || stripAnsi;
          ErrorDebugComponent = passedDebugComponent;
          _context.next = 20;
          return pageLoader.loadPage('/_error');

        case 20:
          exports.ErrorComponent = ErrorComponent = _context.sent;
          _context.prev = 21;
          _context.next = 24;
          return pageLoader.loadPage(pathname);

        case 24:
          Component = _context.sent;
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context['catch'](21);

          console.error(stripAnsi(_context.t0.message + '\n' + _context.t0.stack));
          Component = ErrorComponent;

        case 31:

          exports.router = router = (0, _router2.createRouter)(pathname, query, asPath, {
            pageLoader: pageLoader,
            Component: Component,
            ErrorComponent: ErrorComponent,
            err: err
          });

          router.subscribe(function (_ref6) {
            var Component = _ref6.Component,
                props = _ref6.props,
                hash = _ref6.hash,
                err = _ref6.err;

            render({ Component: Component, props: props, err: err, hash: hash, emitter: emitter });
          });

          hash = location.hash.substring(1);

          render({ Component: Component, props: props, hash: hash, err: err, emitter: emitter });

          return _context.abrupt('return', emitter);

        case 36:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[21, 27]]);
}));


var isInitialRender = true;
function renderReactElement(reactEl, domEl) {
  if (isInitialRender) {
    _reactDom2.default.hydrate(reactEl, domEl);
    isInitialRender = false;
  } else {
    _reactDom2.default.render(reactEl, domEl);
  }
}