'use strict';

exports.__esModule = true;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _url2 = require('url');

var _EventEmitter = require('../EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _shallowEquals = require('../shallow-equals');

var _shallowEquals2 = _interopRequireDefault(_shallowEquals);

var _pQueue = require('../p-queue');

var _pQueue2 = _interopRequireDefault(_pQueue);

var _utils = require('../utils');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function () {
  function Router(pathname, query, as) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        pageLoader = _ref.pageLoader,
        Component = _ref.Component,
        ErrorComponent = _ref.ErrorComponent,
        err = _ref.err;

    (0, _classCallCheck3.default)(this, Router);

    this.route = toRoute(pathname);

    this.components = {};

    if (Component !== ErrorComponent) {
      this.components[this.route] = { Component: Component, err: err };
    }

    this.events = new _EventEmitter2.default();

    this.pageLoader = pageLoader;
    this.prefetchQueue = new _pQueue2.default({ concurrency: 2 });
    this.ErrorComponent = ErrorComponent;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.subscriptions = new _set2.default();
    this.componentLoadCancel = null;
    this.onPopState = this.onPopState.bind(this);

    if (typeof window !== 'undefined') {
      this.changeState('replaceState', (0, _url2.format)({ pathname: pathname, query: query }), (0, _utils.getURL)());

      window.addEventListener('popstate', this.onPopState);
    }
  }

  Router.prototype.onPopState = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e) {
      var pathname, query, _e$state, url, as, options;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (e.state) {
                _context.next = 4;
                break;
              }

              pathname = this.pathname, query = this.query;

              this.changeState('replaceState', (0, _url2.format)({ pathname: pathname, query: query }), (0, _utils.getURL)());
              return _context.abrupt('return');

            case 4:
              _e$state = e.state, url = _e$state.url, as = _e$state.as, options = _e$state.options;

              this.replace(url, as, options);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function onPopState(_x2) {
      return _ref2.apply(this, arguments);
    }

    return onPopState;
  }();

  Router.prototype.update = function update(route, Component) {
    var data = this.components[route];
    if (!data) {
      throw new Error('Cannot update unavailable route: ' + route);
    }

    var newData = (0, _extends3.default)({}, data, { Component: Component });
    this.components[route] = newData;

    if (route === this.route) {
      this.notify(newData);
    }
  };

  Router.prototype.reload = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(route) {
      var pathname, query, url, routeInfo, error;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              delete this.components[route];
              this.pageLoader.clearCache(route);

              if (!(route !== this.route)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return');

            case 4:
              pathname = this.pathname, query = this.query;
              url = window.location.href;


              this.events.emit('routeChangeStart', url);
              _context2.next = 9;
              return this.getRouteInfo(route, pathname, query, url);

            case 9:
              routeInfo = _context2.sent;
              error = routeInfo.error;

              if (!(error && error.cancelled)) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt('return');

            case 13:

              this.notify(routeInfo);

              if (!error) {
                _context2.next = 17;
                break;
              }

              this.events.emit('routeChangeError', error, url);
              throw error;

            case 17:

              this.events.emit('routeChangeComplete', url);

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function reload(_x3) {
      return _ref3.apply(this, arguments);
    }

    return reload;
  }();

  Router.prototype.back = function back() {
    window.history.back();
  };

  Router.prototype.push = function push(url) {
    var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : url;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return this.change('pushState', url, as, options);
  };

  Router.prototype.replace = function replace(url) {
    var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : url;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return this.change('replaceState', url, as, options);
  };

  Router.prototype.change = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(method, _url, _as, options) {
      var url, as, _parse, pathname, query, route, _options$shallow, shallow, routeInfo, _routeInfo, error, hash;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = (typeof _url === 'undefined' ? 'undefined' : (0, _typeof3.default)(_url)) === 'object' ? (0, _url2.format)(_url) : _url;
              as = (typeof _as === 'undefined' ? 'undefined' : (0, _typeof3.default)(_as)) === 'object' ? (0, _url2.format)(_as) : _as;

              if (__NEXT_DATA__.nextExport) {
                as = (0, _._rewriteUrlForNextExport)(as);
              }

              this.abortComponentLoad(as);
              _parse = (0, _url2.parse)(url, true), pathname = _parse.pathname, query = _parse.query;

              if (!this.onlyAHashChange(as)) {
                _context3.next = 9;
                break;
              }

              this.changeState(method, url, as);
              this.scrollToHash(as);
              return _context3.abrupt('return');

            case 9:
              if (!this.urlIsNew(pathname, query)) {
                method = 'replaceState';
              }

              route = toRoute(pathname);
              _options$shallow = options.shallow, shallow = _options$shallow === undefined ? false : _options$shallow;
              routeInfo = null;


              this.events.emit('routeChangeStart', as);

              if (!(shallow && this.isShallowRoutingPossible(route))) {
                _context3.next = 18;
                break;
              }

              routeInfo = this.components[route];
              _context3.next = 21;
              break;

            case 18:
              _context3.next = 20;
              return this.getRouteInfo(route, pathname, query, as);

            case 20:
              routeInfo = _context3.sent;

            case 21:
              _routeInfo = routeInfo, error = _routeInfo.error;

              if (!(error && error.cancelled)) {
                _context3.next = 24;
                break;
              }

              return _context3.abrupt('return', false);

            case 24:

              this.events.emit('beforeHistoryChange', as);
              this.changeState(method, url, as, options);
              hash = window.location.hash.substring(1);


              this.set(route, pathname, query, as, (0, _extends3.default)({}, routeInfo, { hash: hash }));

              if (!error) {
                _context3.next = 31;
                break;
              }

              this.events.emit('routeChangeError', error, as);
              throw error;

            case 31:

              this.events.emit('routeChangeComplete', as);
              return _context3.abrupt('return', true);

            case 33:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function change(_x8, _x9, _x10, _x11) {
      return _ref4.apply(this, arguments);
    }

    return change;
  }();

  Router.prototype.changeState = function changeState(method, url, as) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      window.history[method]({ url: url, as: as, options: options }, null, as);
    }
  };

  Router.prototype.getRouteInfo = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(route, pathname, query, as) {
      var routeInfo, _routeInfo2, Component, ctx, _Component, _ctx;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              routeInfo = null;
              _context4.prev = 1;

              routeInfo = this.components[route];

              if (routeInfo) {
                _context4.next = 8;
                break;
              }

              _context4.next = 6;
              return this.fetchComponent(route, as);

            case 6:
              _context4.t0 = _context4.sent;
              routeInfo = {
                Component: _context4.t0
              };

            case 8:
              _routeInfo2 = routeInfo, Component = _routeInfo2.Component;
              ctx = { pathname: pathname, query: query, asPath: as };
              _context4.next = 12;
              return this.getInitialProps(Component, ctx);

            case 12:
              routeInfo.props = _context4.sent;


              this.components[route] = routeInfo;
              _context4.next = 32;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t1 = _context4['catch'](1);

              if (!_context4.t1.cancelled) {
                _context4.next = 20;
                break;
              }

              return _context4.abrupt('return', { error: _context4.t1 });

            case 20:
              if (!_context4.t1.buildIdMismatched) {
                _context4.next = 24;
                break;
              }

              (0, _._notifyBuildIdMismatch)(as);

              _context4.t1.cancelled = true;
              return _context4.abrupt('return', { error: _context4.t1 });

            case 24:

              if (_context4.t1.statusCode === 404) {
                _context4.t1.ignore = true;
              }

              _Component = this.ErrorComponent;

              routeInfo = { Component: _Component, err: _context4.t1 };
              _ctx = { err: _context4.t1, pathname: pathname, query: query };
              _context4.next = 30;
              return this.getInitialProps(_Component, _ctx);

            case 30:
              routeInfo.props = _context4.sent;


              routeInfo.error = _context4.t1;

            case 32:
              return _context4.abrupt('return', routeInfo);

            case 33:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 16]]);
    }));

    function getRouteInfo(_x13, _x14, _x15, _x16) {
      return _ref5.apply(this, arguments);
    }

    return getRouteInfo;
  }();

  Router.prototype.set = function set(route, pathname, query, as, data) {
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  };

  Router.prototype.onlyAHashChange = function onlyAHashChange(as) {
    if (!this.asPath) return false;

    var _asPath$split = this.asPath.split('#'),
        oldUrlNoHash = _asPath$split[0],
        oldHash = _asPath$split[1];

    var _as$split = as.split('#'),
        newUrlNoHash = _as$split[0],
        newHash = _as$split[1];

    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    }

    return oldHash !== newHash;
  };

  Router.prototype.scrollToHash = function scrollToHash(as) {
    var _as$split2 = as.split('#'),
        hash = _as$split2[1];

    var el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView();
    }
  };

  Router.prototype.urlIsNew = function urlIsNew(pathname, query) {
    return this.pathname !== pathname || !(0, _shallowEquals2.default)(query, this.query);
  };

  Router.prototype.isShallowRoutingPossible = function isShallowRoutingPossible(route) {
    return Boolean(this.components[route]) && this.route === route;
  };

  Router.prototype.prefetch = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(url) {
      var _this = this;

      var _parse2, pathname, route;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(process.env.NODE_ENV === 'development')) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt('return');

            case 2:
              _parse2 = (0, _url2.parse)(url), pathname = _parse2.pathname;
              route = toRoute(pathname);
              return _context5.abrupt('return', this.prefetchQueue.add(function () {
                return _this.fetchRoute(route);
              }));

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function prefetch(_x17) {
      return _ref6.apply(this, arguments);
    }

    return prefetch;
  }();

  Router.prototype.fetchComponent = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(route, as) {
      var cancelled, cancel, Component, error;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              cancelled = false;

              cancel = this.componentLoadCancel = function () {
                cancelled = true;
              };

              _context6.prev = 2;
              _context6.next = 5;
              return this.fetchRoute(route);

            case 5:
              Component = _context6.sent;

              if (!cancelled) {
                _context6.next = 10;
                break;
              }

              error = new Error('Abort fetching component for route: "' + route + '"');

              error.cancelled = true;
              throw error;

            case 10:

              if (cancel === this.componentLoadCancel) {
                this.componentLoadCancel = null;
              }

              return _context6.abrupt('return', Component);

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6['catch'](2);

              window.location.href = as;
              throw _context6.t0;

            case 18:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[2, 14]]);
    }));

    function fetchComponent(_x18, _x19) {
      return _ref7.apply(this, arguments);
    }

    return fetchComponent;
  }();

  Router.prototype.getInitialProps = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(Component, ctx) {
      var cancelled, cancel, props, err;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              cancelled = false;

              cancel = function cancel() {
                cancelled = true;
              };

              this.componentLoadCancel = cancel;

              _context7.next = 5;
              return (0, _utils.loadGetInitialProps)(Component, ctx);

            case 5:
              props = _context7.sent;


              if (cancel === this.componentLoadCancel) {
                this.componentLoadCancel = null;
              }

              if (!cancelled) {
                _context7.next = 11;
                break;
              }

              err = new Error('Loading initial props cancelled');

              err.cancelled = true;
              throw err;

            case 11:
              return _context7.abrupt('return', props);

            case 12:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getInitialProps(_x20, _x21) {
      return _ref8.apply(this, arguments);
    }

    return getInitialProps;
  }();

  Router.prototype.fetchRoute = function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(route) {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.pageLoader.loadPage(route);

            case 2:
              return _context8.abrupt('return', _context8.sent);

            case 3:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function fetchRoute(_x22) {
      return _ref9.apply(this, arguments);
    }

    return fetchRoute;
  }();

  Router.prototype.abortComponentLoad = function abortComponentLoad(as) {
    if (this.componentLoadCancel) {
      this.events.emit('routeChangeError', new Error('Route Cancelled'), as);
      this.componentLoadCancel();
      this.componentLoadCancel = null;
    }
  };

  Router.prototype.notify = function notify(data) {
    this.subscriptions.forEach(function (fn) {
      return fn(data);
    });
  };

  Router.prototype.subscribe = function subscribe(fn) {
    var _this2 = this;

    this.subscriptions.add(fn);
    return function () {
      return _this2.subscriptions.delete(fn);
    };
  };

  return Router;
}();

exports.default = Router;


function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}