"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _nextServer = _interopRequireDefault(require("./next-server"));

var _path = require("path");

var _hotReloader = _interopRequireDefault(require("./hot-reloader"));

var _constants = require("../lib/constants");

var DevServer =
/*#__PURE__*/
function (_Server) {
  (0, _inheritsLoose2["default"])(DevServer, _Server);

  function DevServer(options) {
    var _this;

    _this = _Server.call(this, options) || this;
    _this.hotReloader = new _hotReloader["default"](_this.dir, {
      config: _this.nextConfig,
      buildId: _this.buildId
    });
    _this.renderOpts.hotReloader = _this.hotReloader;
    _this.renderOpts.dev = true;
    return _this;
  }

  var _proto = DevServer.prototype;

  _proto.currentPhase = function currentPhase() {
    return _constants.PHASE_DEVELOPMENT_SERVER;
  };

  _proto.readBuildId = function readBuildId() {
    return 'development';
  };

  _proto.prepare =
  /*#__PURE__*/
  function () {
    var _prepare = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Server.prototype.prepare.call(this);

            case 2:
              _context.next = 4;
              return this.hotReloader.start();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function prepare() {
      return _prepare.apply(this, arguments);
    }

    return prepare;
  }();

  _proto.close =
  /*#__PURE__*/
  function () {
    var _close = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.hotReloader.stop();

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function close() {
      return _close.apply(this, arguments);
    }

    return close;
  }();

  _proto.run =
  /*#__PURE__*/
  function () {
    var _run = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, parsedUrl) {
      var _ref, finished;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.hotReloader.run(req, res, parsedUrl);

            case 2:
              _ref = _context3.sent;
              finished = _ref.finished;

              if (!finished) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return");

            case 6:
              return _context3.abrupt("return", _Server.prototype.run.call(this, req, res, parsedUrl));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function run(_x, _x2, _x3) {
      return _run.apply(this, arguments);
    }

    return run;
  }();

  _proto.generateRoutes =
  /*#__PURE__*/
  function () {
    var _generateRoutes = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var _this2 = this;

      var routes, exportPathMap, _loop, path;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _Server.prototype.generateRoutes.call(this);

            case 2:
              routes = _context6.sent;
              // In development we expose all compiled files for react-error-overlay's line show feature
              // We use unshift so that we're sure the routes is defined before Next's default routes
              routes.unshift({
                path: '/_next/development/:path*',
                fn: function () {
                  var _fn = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee4(req, res, params) {
                    var p;
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            p = _path.join.apply(void 0, [_this2.distDir].concat(params.path || []));
                            _context4.next = 3;
                            return _this2.serveStatic(req, res, p);

                          case 3:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  function fn(_x4, _x5, _x6) {
                    return _fn.apply(this, arguments);
                  }

                  return fn;
                }()
              }); // Makes `next export` exportPathMap work in development mode.
              // So that the user doesn't have to define a custom server reading the exportPathMap

              if (!this.nextConfig.exportPathMap) {
                _context6.next = 11;
                break;
              }

              console.log('Defining routes from exportPathMap');
              _context6.next = 8;
              return this.nextConfig.exportPathMap({}, {
                dev: true,
                dir: this.dir,
                outDir: null,
                distDir: this.distDir,
                buildId: this.buildId
              });

            case 8:
              exportPathMap = _context6.sent;

              _loop = function _loop(path) {
                var _exportPathMap$path = exportPathMap[path],
                    page = _exportPathMap$path.page,
                    _exportPathMap$path$q = _exportPathMap$path.query,
                    query = _exportPathMap$path$q === void 0 ? {} : _exportPathMap$path$q; // We use unshift so that we're sure the routes is defined before Next's default routes

                routes.unshift({
                  path: path,
                  fn: function () {
                    var _fn2 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee5(req, res, params, parsedUrl) {
                      var urlQuery, mergedQuery;
                      return _regenerator["default"].wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              urlQuery = parsedUrl.query;
                              (0, _keys["default"])(urlQuery).filter(function (key) {
                                return query[key] === undefined;
                              }).forEach(function (key) {
                                return console.warn("Url defines a query parameter '" + key + "' that is missing in exportPathMap");
                              });
                              mergedQuery = (0, _objectSpread2["default"])({}, urlQuery, query);
                              _context5.next = 5;
                              return _this2.render(req, res, page, mergedQuery, parsedUrl);

                            case 5:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5);
                    }));

                    function fn(_x7, _x8, _x9, _x10) {
                      return _fn2.apply(this, arguments);
                    }

                    return fn;
                  }()
                });
              };

              // In development we can't give a default path mapping
              for (path in exportPathMap) {
                _loop(path);
              }

            case 11:
              return _context6.abrupt("return", routes);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function generateRoutes() {
      return _generateRoutes.apply(this, arguments);
    }

    return generateRoutes;
  }();

  _proto.renderToHTML =
  /*#__PURE__*/
  function () {
    var _renderToHTML = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(req, res, pathname, query) {
      var compilationErr;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.getCompilationError(pathname);

            case 2:
              compilationErr = _context7.sent;

              if (!compilationErr) {
                _context7.next = 6;
                break;
              }

              res.statusCode = 500;
              return _context7.abrupt("return", this.renderErrorToHTML(compilationErr, req, res, pathname, query));

            case 6:
              return _context7.abrupt("return", _Server.prototype.renderToHTML.call(this, req, res, pathname, query));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function renderToHTML(_x11, _x12, _x13, _x14) {
      return _renderToHTML.apply(this, arguments);
    }

    return renderToHTML;
  }();

  _proto.renderErrorToHTML =
  /*#__PURE__*/
  function () {
    var _renderErrorToHTML = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8(err, req, res, pathname, query) {
      var compilationErr, out;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.getCompilationError(pathname);

            case 2:
              compilationErr = _context8.sent;

              if (!compilationErr) {
                _context8.next = 6;
                break;
              }

              res.statusCode = 500;
              return _context8.abrupt("return", _Server.prototype.renderErrorToHTML.call(this, compilationErr, req, res, pathname, query));

            case 6:
              _context8.prev = 6;
              _context8.next = 9;
              return _Server.prototype.renderErrorToHTML.call(this, err, req, res, pathname, query);

            case 9:
              out = _context8.sent;
              return _context8.abrupt("return", out);

            case 13:
              _context8.prev = 13;
              _context8.t0 = _context8["catch"](6);
              if (!this.quiet) console.error(_context8.t0);
              res.statusCode = 500;
              return _context8.abrupt("return", _Server.prototype.renderErrorToHTML.call(this, _context8.t0, req, res, pathname, query));

            case 18:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this, [[6, 13]]);
    }));

    function renderErrorToHTML(_x15, _x16, _x17, _x18, _x19) {
      return _renderErrorToHTML.apply(this, arguments);
    }

    return renderErrorToHTML;
  }();

  _proto.setImmutableAssetCacheControl = function setImmutableAssetCacheControl(res) {
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
  };

  _proto.getCompilationError =
  /*#__PURE__*/
  function () {
    var _getCompilationError = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9(page) {
      var errors;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.hotReloader.getCompilationErrors(page);

            case 2:
              errors = _context9.sent;

              if (!(errors.length === 0)) {
                _context9.next = 5;
                break;
              }

              return _context9.abrupt("return");

            case 5:
              return _context9.abrupt("return", errors[0]);

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function getCompilationError(_x20) {
      return _getCompilationError.apply(this, arguments);
    }

    return getCompilationError;
  }();

  return DevServer;
}(_nextServer["default"]);

exports["default"] = DevServer;