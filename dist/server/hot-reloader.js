"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/map"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _isArray6 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _path = require("path");

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _errorOverlayMiddleware = _interopRequireDefault(require("./lib/error-overlay-middleware"));

var _del = _interopRequireDefault(require("del"));

var _onDemandEntryHandler = _interopRequireWildcard(require("./on-demand-entry-handler"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpack2 = _interopRequireDefault(require("../build/webpack"));

var _utils = require("./utils");

var _constants = require("../lib/constants");

var _pathMatch = _interopRequireDefault(require("./lib/path-match"));

var _render = require("./render");

var route = (0, _pathMatch["default"])();
var matchNextPageBundleRequest = route('/_next/static/:buildId/pages/:path*.js(.map)?'); // Recursively look up the issuer till it ends up at the root

function findEntryModule(issuer) {
  if (issuer.issuer) {
    return findEntryModule(issuer.issuer);
  }

  return issuer;
}

function erroredPages(compilation, options) {
  if (options === void 0) {
    options = {
      enhanceName: function enhanceName(name) {
        return name;
      }
    };
  }

  var failedPages = {};

  for (var _iterator = compilation.errors, _isArray = (0, _isArray6["default"])(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator2["default"])(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var error = _ref;
    var entryModule = findEntryModule(error.origin);
    var name = entryModule.name;

    if (!name) {
      continue;
    } // Only pages have to be reloaded


    if (!_constants.IS_BUNDLED_PAGE_REGEX.test(name)) {
      continue;
    }

    var enhancedName = options.enhanceName(name);

    if (!failedPages[enhancedName]) {
      failedPages[enhancedName] = [];
    }

    failedPages[enhancedName].push(error);
  }

  return failedPages;
}

var HotReloader =
/*#__PURE__*/
function () {
  function HotReloader(dir, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        config = _ref2.config,
        buildId = _ref2.buildId;

    this.buildId = buildId;
    this.dir = dir;
    this.middlewares = [];
    this.webpackDevMiddleware = null;
    this.webpackHotMiddleware = null;
    this.initialized = false;
    this.stats = null;
    this.compilationErrors = null;
    this.prevChunkNames = null;
    this.prevFailedChunkNames = null;
    this.prevChunkHashes = null;
    this.serverPrevDocumentHash = null;
    this.config = config;
  }

  var _proto = HotReloader.prototype;

  _proto.run =
  /*#__PURE__*/
  function () {
    var _run = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, parsedUrl) {
      var _this = this;

      var _addCorsSupport, preflight, handlePageBundleRequest, _ref4, finished, _loop, _iterator2, _isArray2, _i2, _ref5, _ret;

      return _regenerator["default"].wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Usually CORS support is not needed for the hot-reloader (this is dev only feature)
              // With when the app runs for multi-zones support behind a proxy,
              // the current page is trying to access this URL via assetPrefix.
              // That's when the CORS support is needed.
              _addCorsSupport = (0, _utils.addCorsSupport)(req, res), preflight = _addCorsSupport.preflight;

              if (!preflight) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return");

            case 3:
              // When a request comes in that is a page bundle, e.g. /_next/static/<buildid>/pages/index.js
              // we have to compile the page using on-demand-entries, this middleware will handle doing that
              // by adding the page to on-demand-entries, waiting till it's done
              // and then the bundle will be served like usual by the actual route in server/index.js
              handlePageBundleRequest =
              /*#__PURE__*/
              function () {
                var _ref3 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee(req, res, parsedUrl) {
                  var pathname, params, page, errors;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          pathname = parsedUrl.pathname;
                          params = matchNextPageBundleRequest(pathname);

                          if (params) {
                            _context.next = 4;
                            break;
                          }

                          return _context.abrupt("return", {});

                        case 4:
                          if (!(params.buildId !== _this.buildId)) {
                            _context.next = 6;
                            break;
                          }

                          return _context.abrupt("return");

                        case 6:
                          page = "/" + params.path.join('/');

                          if (!(_constants.BLOCKED_PAGES.indexOf(page) === -1)) {
                            _context.next = 25;
                            break;
                          }

                          _context.prev = 8;
                          _context.next = 11;
                          return _this.ensurePage(page);

                        case 11:
                          _context.next = 18;
                          break;

                        case 13:
                          _context.prev = 13;
                          _context.t0 = _context["catch"](8);
                          _context.next = 17;
                          return (0, _render.renderScriptError)(req, res, page, _context.t0);

                        case 17:
                          return _context.abrupt("return", {
                            finished: true
                          });

                        case 18:
                          _context.next = 20;
                          return _this.getCompilationErrors(page);

                        case 20:
                          errors = _context.sent;

                          if (!(errors.length > 0)) {
                            _context.next = 25;
                            break;
                          }

                          _context.next = 24;
                          return (0, _render.renderScriptError)(req, res, page, errors[0]);

                        case 24:
                          return _context.abrupt("return", {
                            finished: true
                          });

                        case 25:
                          return _context.abrupt("return", {});

                        case 26:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[8, 13]]);
                }));

                return function handlePageBundleRequest(_x4, _x5, _x6) {
                  return _ref3.apply(this, arguments);
                };
              }();

              _context3.next = 6;
              return handlePageBundleRequest(req, res, parsedUrl);

            case 6:
              _ref4 = _context3.sent;
              finished = _ref4.finished;
              _loop =
              /*#__PURE__*/
              _regenerator["default"].mark(function _loop() {
                var fn;
                return _regenerator["default"].wrap(function _loop$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!_isArray2) {
                          _context2.next = 6;
                          break;
                        }

                        if (!(_i2 >= _iterator2.length)) {
                          _context2.next = 3;
                          break;
                        }

                        return _context2.abrupt("return", "break");

                      case 3:
                        _ref5 = _iterator2[_i2++];
                        _context2.next = 10;
                        break;

                      case 6:
                        _i2 = _iterator2.next();

                        if (!_i2.done) {
                          _context2.next = 9;
                          break;
                        }

                        return _context2.abrupt("return", "break");

                      case 9:
                        _ref5 = _i2.value;

                      case 10:
                        fn = _ref5;
                        _context2.next = 13;
                        return new _promise["default"](function (resolve, reject) {
                          fn(req, res, function (err) {
                            if (err) return reject(err);
                            resolve();
                          });
                        });

                      case 13:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _loop);
              });
              _iterator2 = this.middlewares, _isArray2 = (0, _isArray6["default"])(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator2["default"])(_iterator2);

            case 10:
              return _context3.delegateYield(_loop(), "t0", 11);

            case 11:
              _ret = _context3.t0;

              if (!(_ret === "break")) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt("break", 16);

            case 14:
              _context3.next = 10;
              break;

            case 16:
              return _context3.abrupt("return", {
                finished: finished
              });

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, this);
    }));

    function run(_x, _x2, _x3) {
      return _run.apply(this, arguments);
    }

    return run;
  }();

  _proto.clean =
  /*#__PURE__*/
  function () {
    var _clean = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", (0, _del["default"])((0, _path.join)(this.dir, this.config.distDir), {
                force: true
              }));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3, this);
    }));

    function clean() {
      return _clean.apply(this, arguments);
    }

    return clean;
  }();

  _proto.start =
  /*#__PURE__*/
  function () {
    var _start = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var configs, multiCompiler, buildTools;
      return _regenerator["default"].wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.clean();

            case 2:
              _context5.next = 4;
              return _promise["default"].all([(0, _webpack2["default"])(this.dir, {
                dev: true,
                isServer: false,
                config: this.config,
                buildId: this.buildId
              }), (0, _webpack2["default"])(this.dir, {
                dev: true,
                isServer: true,
                config: this.config,
                buildId: this.buildId
              })]);

            case 4:
              configs = _context5.sent;
              multiCompiler = (0, _webpack["default"])(configs);
              _context5.next = 8;
              return this.prepareBuildTools(multiCompiler);

            case 8:
              buildTools = _context5.sent;
              this.assignBuildTools(buildTools);
              _context5.next = 12;
              return this.waitUntilValid();

            case 12:
              this.stats = _context5.sent.stats[0];

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4, this);
    }));

    function start() {
      return _start.apply(this, arguments);
    }

    return start;
  }();

  _proto.stop =
  /*#__PURE__*/
  function () {
    var _stop = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(webpackDevMiddleware) {
      var middleware;
      return _regenerator["default"].wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              middleware = webpackDevMiddleware || this.webpackDevMiddleware;

              if (!middleware) {
                _context6.next = 3;
                break;
              }

              return _context6.abrupt("return", new _promise["default"](function (resolve, reject) {
                middleware.close(function (err) {
                  if (err) return reject(err);
                  resolve();
                });
              }));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5, this);
    }));

    function stop(_x7) {
      return _stop.apply(this, arguments);
    }

    return stop;
  }();

  _proto.reload =
  /*#__PURE__*/
  function () {
    var _reload = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var configs, compiler, buildTools, oldWebpackDevMiddleware;
      return _regenerator["default"].wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.stats = null;
              _context7.next = 3;
              return this.clean();

            case 3:
              _context7.next = 5;
              return _promise["default"].all([(0, _webpack2["default"])(this.dir, {
                dev: true,
                isServer: false,
                config: this.config,
                buildId: this.buildId
              }), (0, _webpack2["default"])(this.dir, {
                dev: true,
                isServer: true,
                config: this.config,
                buildId: this.buildId
              })]);

            case 5:
              configs = _context7.sent;
              compiler = (0, _webpack["default"])(configs);
              _context7.next = 9;
              return this.prepareBuildTools(compiler);

            case 9:
              buildTools = _context7.sent;
              _context7.next = 12;
              return this.waitUntilValid(buildTools.webpackDevMiddleware);

            case 12:
              this.stats = _context7.sent;
              oldWebpackDevMiddleware = this.webpackDevMiddleware;
              this.assignBuildTools(buildTools);
              _context7.next = 17;
              return this.stop(oldWebpackDevMiddleware);

            case 17:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee6, this);
    }));

    function reload() {
      return _reload.apply(this, arguments);
    }

    return reload;
  }();

  _proto.assignBuildTools = function assignBuildTools(_ref6) {
    var webpackDevMiddleware = _ref6.webpackDevMiddleware,
        webpackHotMiddleware = _ref6.webpackHotMiddleware,
        onDemandEntries = _ref6.onDemandEntries;
    this.webpackDevMiddleware = webpackDevMiddleware;
    this.webpackHotMiddleware = webpackHotMiddleware;
    this.onDemandEntries = onDemandEntries;
    this.middlewares = [webpackDevMiddleware, webpackHotMiddleware, _errorOverlayMiddleware["default"], onDemandEntries.middleware()];
  };

  _proto.prepareBuildTools =
  /*#__PURE__*/
  function () {
    var _prepareBuildTools = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(multiCompiler) {
      var _this2 = this;

      var ignored, webpackDevMiddlewareConfig, webpackDevMiddleware, webpackHotMiddleware, onDemandEntries;
      return _regenerator["default"].wrap(function _callee7$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              // This plugin watches for changes to _document.js and notifies the client side that it should reload the page
              multiCompiler.compilers[1].hooks.done.tap('NextjsHotReloaderForServer', function (stats) {
                if (!_this2.initialized) {
                  return;
                }

                var compilation = stats.compilation; // We only watch `_document` for changes on the server compilation
                // the rest of the files will be triggered by the client compilation

                var documentChunk = compilation.chunks.find(function (c) {
                  return c.name === (0, _path.normalize)("static/" + _this2.buildId + "/pages/_document.js");
                }); // If the document chunk can't be found we do nothing

                if (!documentChunk) {
                  console.warn('_document.js chunk not found');
                  return;
                } // Initial value


                if (_this2.serverPrevDocumentHash === null) {
                  _this2.serverPrevDocumentHash = documentChunk.hash;
                  return;
                } // If _document.js didn't change we don't trigger a reload


                if (documentChunk.hash === _this2.serverPrevDocumentHash) {
                  return;
                } // Notify reload to reload the page, as _document.js was changed (different hash)


                _this2.send('reload', '/_document');

                _this2.serverPrevDocumentHash = documentChunk.hash;
              });
              multiCompiler.compilers[0].hooks.done.tap('NextjsHotReloaderForClient', function (stats) {
                var compilation = stats.compilation;
                var chunkNames = new _set["default"](compilation.chunks.map(function (c) {
                  return c.name;
                }).filter(function (name) {
                  return _constants.IS_BUNDLED_PAGE_REGEX.test(name);
                }));
                var failedChunkNames = new _set["default"]((0, _keys["default"])(erroredPages(compilation)));
                var chunkHashes = new _map["default"](compilation.chunks.filter(function (c) {
                  return _constants.IS_BUNDLED_PAGE_REGEX.test(c.name);
                }).map(function (c) {
                  return [c.name, c.hash];
                }));

                if (_this2.initialized) {
                  // detect chunks which have to be replaced with a new template
                  // e.g, pages/index.js <-> pages/_error.js
                  var added = diff(chunkNames, _this2.prevChunkNames);
                  var removed = diff(_this2.prevChunkNames, chunkNames);
                  var succeeded = diff(_this2.prevFailedChunkNames, failedChunkNames); // reload all failed chunks to replace the templace to the error ones,
                  // and to update error content

                  var failed = failedChunkNames;
                  var rootDir = (0, _path.join)(_constants.CLIENT_STATIC_FILES_PATH, _this2.buildId, 'pages');

                  for (var _iterator3 = new _set["default"]([].concat(added, succeeded, removed, failed)), _isArray3 = (0, _isArray6["default"])(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator2["default"])(_iterator3);;) {
                    var _ref7;

                    if (_isArray3) {
                      if (_i3 >= _iterator3.length) break;
                      _ref7 = _iterator3[_i3++];
                    } else {
                      _i3 = _iterator3.next();
                      if (_i3.done) break;
                      _ref7 = _i3.value;
                    }

                    var n = _ref7;

                    var _route = toRoute((0, _path.relative)(rootDir, n));

                    _this2.send('reload', _route);
                  }

                  var changedPageRoutes = [];

                  for (var _iterator4 = chunkHashes, _isArray4 = (0, _isArray6["default"])(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator2["default"])(_iterator4);;) {
                    var _ref8;

                    if (_isArray4) {
                      if (_i4 >= _iterator4.length) break;
                      _ref8 = _iterator4[_i4++];
                    } else {
                      _i4 = _iterator4.next();
                      if (_i4.done) break;
                      _ref8 = _i4.value;
                    }

                    var _ref10 = _ref8,
                        _n = _ref10[0],
                        hash = _ref10[1];
                    if (!_this2.prevChunkHashes.has(_n)) continue;
                    if (_this2.prevChunkHashes.get(_n) === hash) continue;

                    var _route2 = toRoute((0, _path.relative)(rootDir, _n));

                    changedPageRoutes.push(_route2);
                  } // This means `/_app` is most likely included in the list, or a page was added/deleted in this compilation run.
                  // This means we should filter out `/_app` because `/_app` will be re-rendered with the page reload.


                  if (added.size !== 0 || removed.size !== 0 || changedPageRoutes.length > 1) {
                    changedPageRoutes = changedPageRoutes.filter(function (route) {
                      return route !== '/_app' && route !== '/_document';
                    });
                  }

                  for (var _iterator5 = changedPageRoutes, _isArray5 = (0, _isArray6["default"])(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator2["default"])(_iterator5);;) {
                    var _ref9;

                    if (_isArray5) {
                      if (_i5 >= _iterator5.length) break;
                      _ref9 = _iterator5[_i5++];
                    } else {
                      _i5 = _iterator5.next();
                      if (_i5.done) break;
                      _ref9 = _i5.value;
                    }

                    var changedPageRoute = _ref9;

                    // notify change to recover from runtime errors
                    _this2.send('change', changedPageRoute);
                  }
                }

                _this2.initialized = true;
                _this2.stats = stats;
                _this2.compilationErrors = null;
                _this2.prevChunkNames = chunkNames;
                _this2.prevFailedChunkNames = failedChunkNames;
                _this2.prevChunkHashes = chunkHashes;
              }); // We don’t watch .git .next/ and node_modules for changes

              ignored = [/\.git/, /\.next\//, /node_modules/];
              webpackDevMiddlewareConfig = {
                publicPath: "/_next/static/webpack",
                noInfo: true,
                logLevel: 'silent',
                watchOptions: {
                  ignored: ignored
                }
              };

              if (this.config.webpackDevMiddleware) {
                console.log("> Using \"webpackDevMiddleware\" config function defined in " + this.config.configOrigin + ".");
                webpackDevMiddlewareConfig = this.config.webpackDevMiddleware(webpackDevMiddlewareConfig);
              }

              webpackDevMiddleware = (0, _webpackDevMiddleware["default"])(multiCompiler, webpackDevMiddlewareConfig);
              webpackHotMiddleware = (0, _webpackHotMiddleware["default"])(multiCompiler.compilers[0], {
                path: '/_next/webpack-hmr',
                log: false,
                heartbeat: 2500
              });
              onDemandEntries = (0, _onDemandEntryHandler["default"])(webpackDevMiddleware, multiCompiler, (0, _objectSpread2["default"])({
                dir: this.dir,
                buildId: this.buildId,
                dev: true,
                reload: this.reload.bind(this),
                pageExtensions: this.config.pageExtensions
              }, this.config.onDemandEntries));
              return _context8.abrupt("return", {
                webpackDevMiddleware: webpackDevMiddleware,
                webpackHotMiddleware: webpackHotMiddleware,
                onDemandEntries: onDemandEntries
              });

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee7, this);
    }));

    function prepareBuildTools(_x8) {
      return _prepareBuildTools.apply(this, arguments);
    }

    return prepareBuildTools;
  }();

  _proto.waitUntilValid = function waitUntilValid(webpackDevMiddleware) {
    var middleware = webpackDevMiddleware || this.webpackDevMiddleware;
    return new _promise["default"](function (resolve) {
      middleware.waitUntilValid(resolve);
    });
  };

  _proto.getCompilationErrors =
  /*#__PURE__*/
  function () {
    var _getCompilationErrors = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8(page) {
      var normalizedPage, compilation, failedPages;
      return _regenerator["default"].wrap(function _callee8$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              normalizedPage = (0, _onDemandEntryHandler.normalizePage)(page); // When we are reloading, we need to wait until it's reloaded properly.

              _context9.next = 3;
              return this.onDemandEntries.waitUntilReloaded();

            case 3:
              if (!this.stats.hasErrors()) {
                _context9.next = 9;
                break;
              }

              compilation = this.stats.compilation;
              failedPages = erroredPages(compilation, {
                enhanceName: function enhanceName(name) {
                  return '/' + _constants.ROUTE_NAME_REGEX.exec(name)[1];
                }
              }); // If there is an error related to the requesting page we display it instead of the first error

              if (!(failedPages[normalizedPage] && failedPages[normalizedPage].length > 0)) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return", failedPages[normalizedPage]);

            case 8:
              return _context9.abrupt("return", this.stats.compilation.errors);

            case 9:
              return _context9.abrupt("return", []);

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee8, this);
    }));

    function getCompilationErrors(_x9) {
      return _getCompilationErrors.apply(this, arguments);
    }

    return getCompilationErrors;
  }();

  _proto.send = function send(action) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this.webpackHotMiddleware.publish({
      action: action,
      data: args
    });
  };

  _proto.ensurePage =
  /*#__PURE__*/
  function () {
    var _ensurePage = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9(page) {
      return _regenerator["default"].wrap(function _callee9$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!(page === '/_error' || page === '/_document' || page === '/_app')) {
                _context10.next = 2;
                break;
              }

              return _context10.abrupt("return");

            case 2:
              _context10.next = 4;
              return this.onDemandEntries.ensurePage(page);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee9, this);
    }));

    function ensurePage(_x10) {
      return _ensurePage.apply(this, arguments);
    }

    return ensurePage;
  }();

  return HotReloader;
}();

exports["default"] = HotReloader;

function diff(a, b) {
  return new _set["default"]([].concat(a).filter(function (v) {
    return !b.has(v);
  }));
}

function toRoute(file) {
  var f = _path.sep === '\\' ? file.replace(/\\/g, '/') : file;
  return ('/' + f).replace(/(\/index)?\.js$/, '') || '/';
}