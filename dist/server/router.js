"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _isArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/map"));

var _pathMatch = _interopRequireDefault(require("./lib/path-match"));

var route = (0, _pathMatch["default"])();

var Router =
/*#__PURE__*/
function () {
  function Router() {
    this.routes = new _map["default"]();
  }

  var _proto = Router.prototype;

  _proto.add = function add(method, path, fn) {
    var routes = this.routes.get(method) || new _set["default"]();
    routes.add({
      match: route(path),
      fn: fn
    });
    this.routes.set(method, routes);
  };

  _proto.match = function match(req, res, parsedUrl) {
    var routes = this.routes.get(req.method);
    if (!routes) return;
    var pathname = parsedUrl.pathname;

    var _loop2 = function _loop2() {
      if (_isArray) {
        if (_i >= _iterator.length) return "break";
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) return "break";
        _ref = _i.value;
      }

      var r = _ref;
      var params = r.match(pathname);

      if (params) {
        return {
          v: function () {
            var _v = (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee() {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt("return", r.fn(req, res, params, parsedUrl));

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            function v() {
              return _v.apply(this, arguments);
            }

            return v;
          }()
        };
      }
    };

    _loop: for (var _iterator = routes, _isArray = (0, _isArray2["default"])(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator2["default"])(_iterator);;) {
      var _ref;

      var _ret = _loop2();

      switch (_ret) {
        case "break":
          break _loop;

        default:
          if (typeof _ret === "object") return _ret.v;
      }
    }
  };

  return Router;
}();

exports["default"] = Router;