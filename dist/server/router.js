'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _pathMatch = require('path-match');

var _pathMatch2 = _interopRequireDefault(_pathMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var route = (0, _pathMatch2['default'])();

var Router = function () {
  function Router(conf) {
    (0, _classCallCheck3['default'])(this, Router);

    this.routes = new _map2['default']();
    this.baseRoute = conf.baseRoute;
  }

  Router.prototype.add = function add(method, path, fn) {
    var routes = this.routes.get(method) || new _set2['default']();
    routes.add({ match: route(path), fn: fn });
    this.routes.set(method, routes);
  };

  Router.prototype.match = function match(req, res, parsedUrl) {
    var _this = this;

    var routes = this.routes.get(req.method);
    if (!routes) return;

    var pathname = parsedUrl.pathname;

    var _loop = function _loop() {
      if (_isArray) {
        if (_i >= _iterator.length) return 'break';
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) return 'break';
        _ref = _i.value;
      }

      var r = _ref;

      var params = r.match(pathname);
      if (params) {
        return {
          v: function () {
            var _ref2 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
              return _regenerator2['default'].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt('return', r.fn(req, res, params, parsedUrl));

                    case 1:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            }));

            return function v() {
              return _ref2.apply(this, arguments);
            };
          }()
        };
      }
    };

    _loop2: for (var _iterator = routes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3['default'])(_iterator);;) {
      var _ref;

      var _ret = _loop();

      switch (_ret) {
        case 'break':
          break _loop2;

        default:
          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3['default'])(_ret)) === "object") return _ret.v;
      }
    }
  };

  return Router;
}();

exports['default'] = Router;