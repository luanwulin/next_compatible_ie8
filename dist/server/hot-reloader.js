'use strict';

<<<<<<< HEAD
exports.__esModule = true;
=======
Object.defineProperty(exports, "__esModule", {
  value: true
});
>>>>>>> parent of b9f85a6... 又兼容了一把

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

<<<<<<< HEAD
=======
var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

>>>>>>> parent of b9f85a6... 又兼容了一把
var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

<<<<<<< HEAD
=======
var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

>>>>>>> parent of b9f85a6... 又兼容了一把
var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

<<<<<<< HEAD
=======
var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

>>>>>>> parent of b9f85a6... 又兼容了一把
var _path = require('path');

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _onDemandEntryHandler = require('./on-demand-entry-handler');

var _onDemandEntryHandler2 = _interopRequireDefault(_onDemandEntryHandler);

var _webpack = require('./build/webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _clean = require('./build/clean');

var _clean2 = _interopRequireDefault(_clean);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HotReloader = function () {
  function HotReloader(dir) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        quiet = _ref.quiet,
        conf = _ref.conf;

    (0, _classCallCheck3.default)(this, HotReloader);

    this.dir = dir;
    this.quiet = quiet;
    this.middlewares = [];
    this.webpackDevMiddleware = null;
    this.webpackHotMiddleware = null;
    this.initialized = false;
    this.stats = null;
    this.compilationErrors = null;
    this.prevAssets = null;
    this.prevChunkNames = null;
    this.prevFailedChunkNames = null;
    this.prevChunkHashes = null;
    // Here buildId could be any value.
    // Our router accepts any value in the dev mode.
    // But for the webpack-compiler and for the webpack-dev-server
    // it should be the same value.
    this.buildId = _uuid2.default.v4();

    this.config = (0, _config2.default)(dir, conf);
  }

<<<<<<< HEAD
  HotReloader.prototype.run = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var _this = this;

      var _loop, _iterator, _isArray, _i, _ref3, fn;

      return _regenerator2.default.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(fn) {
                return _regenerator2.default.wrap(function _loop$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return new _promise2.default(function (resolve, reject) {
                          fn(req, res, function (err) {
                            if (err) return reject(err);
                            resolve();
                          });
                        });

                      case 2:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _loop, _this);
              });
              _iterator = this.middlewares, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

            case 2:
              if (!_isArray) {
                _context2.next = 8;
                break;
              }

              if (!(_i >= _iterator.length)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('break', 16);

            case 5:
              _ref3 = _iterator[_i++];
              _context2.next = 12;
              break;

            case 8:
              _i = _iterator.next();

              if (!_i.done) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt('break', 16);

            case 11:
              _ref3 = _i.value;

            case 12:
              fn = _ref3;
              return _context2.delegateYield(_loop(fn), 't0', 14);

            case 14:
              _context2.next = 2;
              break;

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee, this);
    }));

    function run(_x2, _x3) {
      return _ref2.apply(this, arguments);
    }

    return run;
  }();

  HotReloader.prototype.start = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var _ref5, compiler, buildTools;

      return _regenerator2.default.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _promise2.default.all([(0, _webpack2.default)(this.dir, { buildId: this.buildId, dev: true, quiet: this.quiet }), (0, _clean2.default)(this.dir)]);

            case 2:
              _ref5 = _context3.sent;
              compiler = _ref5[0];
              _context3.next = 6;
              return this.prepareBuildTools(compiler);

            case 6:
              buildTools = _context3.sent;

              this.assignBuildTools(buildTools);

              _context3.next = 10;
              return this.waitUntilValid();

            case 10:
              this.stats = _context3.sent;

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee2, this);
    }));

    function start() {
      return _ref4.apply(this, arguments);
    }

    return start;
  }();

  HotReloader.prototype.stop = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(webpackDevMiddleware) {
      var middleware;
      return _regenerator2.default.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              middleware = webpackDevMiddleware || this.webpackDevMiddleware;

              if (!middleware) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt('return', new _promise2.default(function (resolve, reject) {
                middleware.close(function (err) {
                  if (err) return reject(err);
                  resolve();
                });
              }));

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee3, this);
    }));

    function stop(_x4) {
      return _ref6.apply(this, arguments);
    }

    return stop;
  }();

  HotReloader.prototype.reload = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var _ref8, compiler, buildTools, oldWebpackDevMiddleware;

      return _regenerator2.default.wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.stats = null;

              _context5.next = 3;
              return _promise2.default.all([(0, _webpack2.default)(this.dir, { buildId: this.buildId, dev: true, quiet: this.quiet }), (0, _clean2.default)(this.dir)]);

            case 3:
              _ref8 = _context5.sent;
              compiler = _ref8[0];
              _context5.next = 7;
              return this.prepareBuildTools(compiler);

            case 7:
              buildTools = _context5.sent;
              _context5.next = 10;
              return this.waitUntilValid(buildTools.webpackDevMiddleware);

            case 10:
              this.stats = _context5.sent;
              oldWebpackDevMiddleware = this.webpackDevMiddleware;


              this.assignBuildTools(buildTools);
              _context5.next = 15;
              return this.stop(oldWebpackDevMiddleware);

            case 15:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee4, this);
    }));

    function reload() {
      return _ref7.apply(this, arguments);
    }

    return reload;
  }();

  HotReloader.prototype.assignBuildTools = function assignBuildTools(_ref9) {
    var webpackDevMiddleware = _ref9.webpackDevMiddleware,
        webpackHotMiddleware = _ref9.webpackHotMiddleware,
        onDemandEntries = _ref9.onDemandEntries;

    this.webpackDevMiddleware = webpackDevMiddleware;
    this.webpackHotMiddleware = webpackHotMiddleware;
    this.onDemandEntries = onDemandEntries;
    this.middlewares = [webpackDevMiddleware, webpackHotMiddleware, onDemandEntries.middleware()];
  };

  HotReloader.prototype.prepareBuildTools = function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(compiler) {
      var _this2 = this;

      var ignored, webpackDevMiddlewareConfig, webpackDevMiddleware, webpackHotMiddleware, onDemandEntries;
      return _regenerator2.default.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              compiler.plugin('after-emit', function (compilation, callback) {
                var assets = compilation.assets;


                if (_this2.prevAssets) {
                  for (var _iterator2 = (0, _keys2.default)(assets), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
                    var _ref11;

                    if (_isArray2) {
                      if (_i2 >= _iterator2.length) break;
                      _ref11 = _iterator2[_i2++];
                    } else {
                      _i2 = _iterator2.next();
                      if (_i2.done) break;
                      _ref11 = _i2.value;
                    }

                    var f = _ref11;

                    deleteCache(assets[f].existsAt);
                  }
                  for (var _iterator3 = (0, _keys2.default)(_this2.prevAssets), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
                    var _ref12;

                    if (_isArray3) {
                      if (_i3 >= _iterator3.length) break;
                      _ref12 = _iterator3[_i3++];
                    } else {
                      _i3 = _iterator3.next();
                      if (_i3.done) break;
                      _ref12 = _i3.value;
                    }

                    var _f = _ref12;

                    if (!assets[_f]) {
                      deleteCache(_this2.prevAssets[_f].existsAt);
                    }
                  }
                }
                _this2.prevAssets = assets;

                callback();
              });

              compiler.plugin('done', function (stats) {
                var compilation = stats.compilation;

                var chunkNames = new _set2.default(compilation.chunks.map(function (c) {
                  return c.name;
                }).filter(function (name) {
                  return _utils.IS_BUNDLED_PAGE.test(name);
                }));

                var failedChunkNames = new _set2.default(compilation.errors.map(function (e) {
                  return e.module.reasons;
                }).reduce(function (a, b) {
                  return a.concat(b);
                }, []).map(function (r) {
                  return r.module.chunks;
                }).reduce(function (a, b) {
                  return a.concat(b);
                }, []).map(function (c) {
                  return c.name;
                }));

                var chunkHashes = new _map2.default(compilation.chunks.filter(function (c) {
                  return _utils.IS_BUNDLED_PAGE.test(c.name);
                }).map(function (c) {
                  return [c.name, c.hash];
                }));

                if (_this2.initialized) {
                  // detect chunks which have to be replaced with a new template
                  // e.g, pages/index.js <-> pages/_error.js
                  var added = diff(chunkNames, _this2.prevChunkNames);
                  var removed = diff(_this2.prevChunkNames, chunkNames);
                  var succeeded = diff(_this2.prevFailedChunkNames, failedChunkNames);

                  // reload all failed chunks to replace the templace to the error ones,
                  // and to update error content
                  var failed = failedChunkNames;

                  var rootDir = (0, _path.join)('bundles', 'pages');

                  for (var _iterator4 = new _set2.default([].concat(added, removed, failed, succeeded)), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
                    var _ref13;

                    if (_isArray4) {
                      if (_i4 >= _iterator4.length) break;
                      _ref13 = _iterator4[_i4++];
                    } else {
                      _i4 = _iterator4.next();
                      if (_i4.done) break;
                      _ref13 = _i4.value;
                    }

                    var n = _ref13;

                    var route = toRoute((0, _path.relative)(rootDir, n));
                    _this2.send('reload', route);
                  }

                  for (var _iterator5 = chunkHashes, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
                    var _ref15;

                    if (_isArray5) {
                      if (_i5 >= _iterator5.length) break;
                      _ref15 = _iterator5[_i5++];
                    } else {
                      _i5 = _iterator5.next();
                      if (_i5.done) break;
                      _ref15 = _i5.value;
                    }

                    var _ref14 = _ref15;
                    var _n = _ref14[0];
                    var hash = _ref14[1];

                    if (!_this2.prevChunkHashes.has(_n)) continue;
                    if (_this2.prevChunkHashes.get(_n) === hash) continue;

                    var route = toRoute((0, _path.relative)(rootDir, _n));

                    // notify change to recover from runtime errors
                    _this2.send('change', route);
                  }
                }

                _this2.initialized = true;
                _this2.stats = stats;
                _this2.compilationErrors = null;
                _this2.prevChunkNames = chunkNames;
                _this2.prevFailedChunkNames = failedChunkNames;
                _this2.prevChunkHashes = chunkHashes;
              });

              ignored = [/(^|[/\\])\../, // .dotfiles
              /node_modules/];
              webpackDevMiddlewareConfig = {
                publicPath: '/_next/' + this.buildId + '/webpack/',
                noInfo: true,
                quiet: true,
                clientLogLevel: 'warning',
                watchOptions: { ignored: ignored }
              };


              if (this.config.webpackDevMiddleware) {
                console.log('> Using "webpackDevMiddleware" config function defined in ' + this.config.configOrigin + '.');
                webpackDevMiddlewareConfig = this.config.webpackDevMiddleware(webpackDevMiddlewareConfig);
              }

              webpackDevMiddleware = (0, _webpackDevMiddleware2.default)(compiler, webpackDevMiddlewareConfig);
              webpackHotMiddleware = (0, _webpackHotMiddleware2.default)(compiler, {
                path: '/_next/webpack-hmr',
                log: false,
                heartbeat: 2500
              });
              onDemandEntries = (0, _onDemandEntryHandler2.default)(webpackDevMiddleware, compiler, (0, _extends3.default)({
                dir: this.dir,
                dev: true,
                reload: this.reload.bind(this)
              }, this.config.onDemandEntries));
              return _context6.abrupt('return', {
                webpackDevMiddleware: webpackDevMiddleware,
                webpackHotMiddleware: webpackHotMiddleware,
                onDemandEntries: onDemandEntries
              });

            case 9:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee5, this);
    }));

    function prepareBuildTools(_x5) {
      return _ref10.apply(this, arguments);
    }

    return prepareBuildTools;
  }();

  HotReloader.prototype.waitUntilValid = function waitUntilValid(webpackDevMiddleware) {
    var middleware = webpackDevMiddleware || this.webpackDevMiddleware;
    return new _promise2.default(function (resolve) {
      middleware.waitUntilValid(resolve);
    });
  };

  HotReloader.prototype.getCompilationErrors = function () {
    var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var _stats$compilation, compiler, errors, _iterator6, _isArray6, _i6, _ref17, err, _iterator7, _isArray7, _i7, _ref18, r, _iterator8, _isArray8, _i8, _ref19, c, path, _errors;

      return _regenerator2.default.wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.onDemandEntries.waitUntilReloaded();

            case 2:
              if (this.compilationErrors) {
                _context7.next = 51;
                break;
              }

              this.compilationErrors = new _map2.default();

              if (!this.stats.hasErrors()) {
                _context7.next = 51;
                break;
              }

              _stats$compilation = this.stats.compilation, compiler = _stats$compilation.compiler, errors = _stats$compilation.errors;
              _iterator6 = errors, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);

            case 7:
              if (!_isArray6) {
                _context7.next = 13;
                break;
              }

              if (!(_i6 >= _iterator6.length)) {
                _context7.next = 10;
                break;
              }

              return _context7.abrupt('break', 51);

            case 10:
              _ref17 = _iterator6[_i6++];
              _context7.next = 17;
              break;

            case 13:
              _i6 = _iterator6.next();

              if (!_i6.done) {
                _context7.next = 16;
                break;
              }

              return _context7.abrupt('break', 51);

            case 16:
              _ref17 = _i6.value;

            case 17:
              err = _ref17;
              _iterator7 = err.module.reasons, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);

            case 19:
              if (!_isArray7) {
                _context7.next = 25;
                break;
              }

              if (!(_i7 >= _iterator7.length)) {
                _context7.next = 22;
                break;
              }

              return _context7.abrupt('break', 49);

            case 22:
              _ref18 = _iterator7[_i7++];
              _context7.next = 29;
              break;

            case 25:
              _i7 = _iterator7.next();

              if (!_i7.done) {
                _context7.next = 28;
                break;
              }

              return _context7.abrupt('break', 49);

            case 28:
              _ref18 = _i7.value;

            case 29:
              r = _ref18;
              _iterator8 = r.module.chunks, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3.default)(_iterator8);

            case 31:
              if (!_isArray8) {
                _context7.next = 37;
                break;
              }

              if (!(_i8 >= _iterator8.length)) {
                _context7.next = 34;
                break;
              }

              return _context7.abrupt('break', 47);

            case 34:
              _ref19 = _iterator8[_i8++];
              _context7.next = 41;
              break;

            case 37:
              _i8 = _iterator8.next();

              if (!_i8.done) {
                _context7.next = 40;
                break;
              }

              return _context7.abrupt('break', 47);

            case 40:
              _ref19 = _i8.value;

            case 41:
              c = _ref19;

              // get the path of the bundle file
              path = (0, _path.join)(compiler.outputPath, c.name);
              _errors = this.compilationErrors.get(path) || [];

              this.compilationErrors.set(path, _errors.concat([err]));

            case 45:
              _context7.next = 31;
              break;

            case 47:
              _context7.next = 19;
              break;

            case 49:
              _context7.next = 7;
              break;

            case 51:
              return _context7.abrupt('return', this.compilationErrors);

            case 52:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee6, this);
    }));

    function getCompilationErrors() {
      return _ref16.apply(this, arguments);
    }

    return getCompilationErrors;
  }();

  HotReloader.prototype.send = function send(action) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this.webpackHotMiddleware.publish({ action: action, data: args });
  };

  HotReloader.prototype.ensurePage = function ensurePage(page) {
    return this.onDemandEntries.ensurePage(page);
  };

=======
  (0, _createClass3.default)(HotReloader, [{
    key: 'run',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _this = this;

        var _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, fn;

        return _regenerator2.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(fn) {
                  return _regenerator2.default.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return new _promise2.default(function (resolve, reject) {
                            fn(req, res, function (err) {
                              if (err) return reject(err);
                              resolve();
                            });
                          });

                        case 2:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this);
                });
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;
                _iterator = (0, _getIterator3.default)(this.middlewares);

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 12;
                  break;
                }

                fn = _step.value;
                return _context2.delegateYield(_loop(fn), 't0', 9);

              case 9:
                _iteratorNormalCompletion = true;
                _context2.next = 6;
                break;

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t1 = _context2['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 18:
                _context2.prev = 18;
                _context2.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 21:
                _context2.prev = 21;

                if (!_didIteratorError) {
                  _context2.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context2.finish(21);

              case 25:
                return _context2.finish(18);

              case 26:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this, [[4, 14, 18, 26], [19,, 21, 25]]);
      }));

      function run(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'start',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _ref4, _ref5, compiler, buildTools;

        return _regenerator2.default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _promise2.default.all([(0, _webpack2.default)(this.dir, { buildId: this.buildId, dev: true, quiet: this.quiet }), (0, _clean2.default)(this.dir)]);

              case 2:
                _ref4 = _context3.sent;
                _ref5 = (0, _slicedToArray3.default)(_ref4, 1);
                compiler = _ref5[0];
                _context3.next = 7;
                return this.prepareBuildTools(compiler);

              case 7:
                buildTools = _context3.sent;

                this.assignBuildTools(buildTools);

                _context3.next = 11;
                return this.waitUntilValid();

              case 11:
                this.stats = _context3.sent;

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function start() {
        return _ref3.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'stop',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(webpackDevMiddleware) {
        var middleware;
        return _regenerator2.default.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                middleware = webpackDevMiddleware || this.webpackDevMiddleware;

                if (!middleware) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt('return', new _promise2.default(function (resolve, reject) {
                  middleware.close(function (err) {
                    if (err) return reject(err);
                    resolve();
                  });
                }));

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function stop(_x4) {
        return _ref6.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: 'reload',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _ref8, _ref9, compiler, buildTools, oldWebpackDevMiddleware;

        return _regenerator2.default.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.stats = null;

                _context5.next = 3;
                return _promise2.default.all([(0, _webpack2.default)(this.dir, { buildId: this.buildId, dev: true, quiet: this.quiet }), (0, _clean2.default)(this.dir)]);

              case 3:
                _ref8 = _context5.sent;
                _ref9 = (0, _slicedToArray3.default)(_ref8, 1);
                compiler = _ref9[0];
                _context5.next = 8;
                return this.prepareBuildTools(compiler);

              case 8:
                buildTools = _context5.sent;
                _context5.next = 11;
                return this.waitUntilValid(buildTools.webpackDevMiddleware);

              case 11:
                this.stats = _context5.sent;
                oldWebpackDevMiddleware = this.webpackDevMiddleware;


                this.assignBuildTools(buildTools);
                _context5.next = 16;
                return this.stop(oldWebpackDevMiddleware);

              case 16:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee4, this);
      }));

      function reload() {
        return _ref7.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: 'assignBuildTools',
    value: function assignBuildTools(_ref10) {
      var webpackDevMiddleware = _ref10.webpackDevMiddleware,
          webpackHotMiddleware = _ref10.webpackHotMiddleware,
          onDemandEntries = _ref10.onDemandEntries;

      this.webpackDevMiddleware = webpackDevMiddleware;
      this.webpackHotMiddleware = webpackHotMiddleware;
      this.onDemandEntries = onDemandEntries;
      this.middlewares = [webpackDevMiddleware, webpackHotMiddleware, onDemandEntries.middleware()];
    }
  }, {
    key: 'prepareBuildTools',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(compiler) {
        var _this2 = this;

        var ignored, webpackDevMiddlewareConfig, webpackDevMiddleware, webpackHotMiddleware, onDemandEntries;
        return _regenerator2.default.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                compiler.plugin('after-emit', function (compilation, callback) {
                  var assets = compilation.assets;


                  if (_this2.prevAssets) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(assets)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var f = _step2.value;

                        deleteCache(assets[f].existsAt);
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                          _iterator2.return();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = (0, _getIterator3.default)((0, _keys2.default)(_this2.prevAssets)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _f = _step3.value;

                        if (!assets[_f]) {
                          deleteCache(_this2.prevAssets[_f].existsAt);
                        }
                      }
                    } catch (err) {
                      _didIteratorError3 = true;
                      _iteratorError3 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                          _iterator3.return();
                        }
                      } finally {
                        if (_didIteratorError3) {
                          throw _iteratorError3;
                        }
                      }
                    }
                  }
                  _this2.prevAssets = assets;

                  callback();
                });

                compiler.plugin('done', function (stats) {
                  var compilation = stats.compilation;

                  var chunkNames = new _set2.default(compilation.chunks.map(function (c) {
                    return c.name;
                  }).filter(function (name) {
                    return _utils.IS_BUNDLED_PAGE.test(name);
                  }));

                  var failedChunkNames = new _set2.default(compilation.errors.map(function (e) {
                    return e.module.reasons;
                  }).reduce(function (a, b) {
                    return a.concat(b);
                  }, []).map(function (r) {
                    return r.module.chunks;
                  }).reduce(function (a, b) {
                    return a.concat(b);
                  }, []).map(function (c) {
                    return c.name;
                  }));

                  var chunkHashes = new _map2.default(compilation.chunks.filter(function (c) {
                    return _utils.IS_BUNDLED_PAGE.test(c.name);
                  }).map(function (c) {
                    return [c.name, c.hash];
                  }));

                  if (_this2.initialized) {
                    // detect chunks which have to be replaced with a new template
                    // e.g, pages/index.js <-> pages/_error.js
                    var added = diff(chunkNames, _this2.prevChunkNames);
                    var removed = diff(_this2.prevChunkNames, chunkNames);
                    var succeeded = diff(_this2.prevFailedChunkNames, failedChunkNames);

                    // reload all failed chunks to replace the templace to the error ones,
                    // and to update error content
                    var failed = failedChunkNames;

                    var rootDir = (0, _path.join)('bundles', 'pages');

                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                      for (var _iterator4 = (0, _getIterator3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(added), (0, _toConsumableArray3.default)(removed), (0, _toConsumableArray3.default)(failed), (0, _toConsumableArray3.default)(succeeded)))), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var n = _step4.value;

                        var route = toRoute((0, _path.relative)(rootDir, n));
                        _this2.send('reload', route);
                      }
                    } catch (err) {
                      _didIteratorError4 = true;
                      _iteratorError4 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                          _iterator4.return();
                        }
                      } finally {
                        if (_didIteratorError4) {
                          throw _iteratorError4;
                        }
                      }
                    }

                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                      for (var _iterator5 = (0, _getIterator3.default)(chunkHashes), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var _ref12 = _step5.value;

                        var _ref13 = (0, _slicedToArray3.default)(_ref12, 2);

                        var _n = _ref13[0];
                        var hash = _ref13[1];

                        if (!_this2.prevChunkHashes.has(_n)) continue;
                        if (_this2.prevChunkHashes.get(_n) === hash) continue;

                        var route = toRoute((0, _path.relative)(rootDir, _n));

                        // notify change to recover from runtime errors
                        _this2.send('change', route);
                      }
                    } catch (err) {
                      _didIteratorError5 = true;
                      _iteratorError5 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                          _iterator5.return();
                        }
                      } finally {
                        if (_didIteratorError5) {
                          throw _iteratorError5;
                        }
                      }
                    }
                  }

                  _this2.initialized = true;
                  _this2.stats = stats;
                  _this2.compilationErrors = null;
                  _this2.prevChunkNames = chunkNames;
                  _this2.prevFailedChunkNames = failedChunkNames;
                  _this2.prevChunkHashes = chunkHashes;
                });

                ignored = [/(^|[/\\])\../, // .dotfiles
                /node_modules/];
                webpackDevMiddlewareConfig = {
                  publicPath: '/_next/' + this.buildId + '/webpack/',
                  noInfo: true,
                  quiet: true,
                  clientLogLevel: 'warning',
                  watchOptions: { ignored: ignored }
                };


                if (this.config.webpackDevMiddleware) {
                  console.log('> Using "webpackDevMiddleware" config function defined in ' + this.config.configOrigin + '.');
                  webpackDevMiddlewareConfig = this.config.webpackDevMiddleware(webpackDevMiddlewareConfig);
                }

                webpackDevMiddleware = (0, _webpackDevMiddleware2.default)(compiler, webpackDevMiddlewareConfig);
                webpackHotMiddleware = (0, _webpackHotMiddleware2.default)(compiler, {
                  path: '/_next/webpack-hmr',
                  log: false,
                  heartbeat: 2500
                });
                onDemandEntries = (0, _onDemandEntryHandler2.default)(webpackDevMiddleware, compiler, (0, _extends3.default)({
                  dir: this.dir,
                  dev: true,
                  reload: this.reload.bind(this)
                }, this.config.onDemandEntries));
                return _context6.abrupt('return', {
                  webpackDevMiddleware: webpackDevMiddleware,
                  webpackHotMiddleware: webpackHotMiddleware,
                  onDemandEntries: onDemandEntries
                });

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function prepareBuildTools(_x5) {
        return _ref11.apply(this, arguments);
      }

      return prepareBuildTools;
    }()
  }, {
    key: 'waitUntilValid',
    value: function waitUntilValid(webpackDevMiddleware) {
      var middleware = webpackDevMiddleware || this.webpackDevMiddleware;
      return new _promise2.default(function (resolve) {
        middleware.waitUntilValid(resolve);
      });
    }
  }, {
    key: 'getCompilationErrors',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var _stats$compilation, compiler, errors, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, err, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, r, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, c, path, _errors;

        return _regenerator2.default.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.onDemandEntries.waitUntilReloaded();

              case 2:
                if (this.compilationErrors) {
                  _context7.next = 73;
                  break;
                }

                this.compilationErrors = new _map2.default();

                if (!this.stats.hasErrors()) {
                  _context7.next = 73;
                  break;
                }

                _stats$compilation = this.stats.compilation, compiler = _stats$compilation.compiler, errors = _stats$compilation.errors;
                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context7.prev = 9;
                _iterator6 = (0, _getIterator3.default)(errors);

              case 11:
                if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                  _context7.next = 59;
                  break;
                }

                err = _step6.value;
                _iteratorNormalCompletion7 = true;
                _didIteratorError7 = false;
                _iteratorError7 = undefined;
                _context7.prev = 16;
                _iterator7 = (0, _getIterator3.default)(err.module.reasons);

              case 18:
                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                  _context7.next = 42;
                  break;
                }

                r = _step7.value;
                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                _context7.prev = 23;

                for (_iterator8 = (0, _getIterator3.default)(r.module.chunks); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                  c = _step8.value;

                  // get the path of the bundle file
                  path = (0, _path.join)(compiler.outputPath, c.name);
                  _errors = this.compilationErrors.get(path) || [];

                  this.compilationErrors.set(path, _errors.concat([err]));
                }
                _context7.next = 31;
                break;

              case 27:
                _context7.prev = 27;
                _context7.t0 = _context7['catch'](23);
                _didIteratorError8 = true;
                _iteratorError8 = _context7.t0;

              case 31:
                _context7.prev = 31;
                _context7.prev = 32;

                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }

              case 34:
                _context7.prev = 34;

                if (!_didIteratorError8) {
                  _context7.next = 37;
                  break;
                }

                throw _iteratorError8;

              case 37:
                return _context7.finish(34);

              case 38:
                return _context7.finish(31);

              case 39:
                _iteratorNormalCompletion7 = true;
                _context7.next = 18;
                break;

              case 42:
                _context7.next = 48;
                break;

              case 44:
                _context7.prev = 44;
                _context7.t1 = _context7['catch'](16);
                _didIteratorError7 = true;
                _iteratorError7 = _context7.t1;

              case 48:
                _context7.prev = 48;
                _context7.prev = 49;

                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }

              case 51:
                _context7.prev = 51;

                if (!_didIteratorError7) {
                  _context7.next = 54;
                  break;
                }

                throw _iteratorError7;

              case 54:
                return _context7.finish(51);

              case 55:
                return _context7.finish(48);

              case 56:
                _iteratorNormalCompletion6 = true;
                _context7.next = 11;
                break;

              case 59:
                _context7.next = 65;
                break;

              case 61:
                _context7.prev = 61;
                _context7.t2 = _context7['catch'](9);
                _didIteratorError6 = true;
                _iteratorError6 = _context7.t2;

              case 65:
                _context7.prev = 65;
                _context7.prev = 66;

                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }

              case 68:
                _context7.prev = 68;

                if (!_didIteratorError6) {
                  _context7.next = 71;
                  break;
                }

                throw _iteratorError6;

              case 71:
                return _context7.finish(68);

              case 72:
                return _context7.finish(65);

              case 73:
                return _context7.abrupt('return', this.compilationErrors);

              case 74:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee6, this, [[9, 61, 65, 73], [16, 44, 48, 56], [23, 27, 31, 39], [32,, 34, 38], [49,, 51, 55], [66,, 68, 72]]);
      }));

      function getCompilationErrors() {
        return _ref14.apply(this, arguments);
      }

      return getCompilationErrors;
    }()
  }, {
    key: 'send',
    value: function send(action) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.webpackHotMiddleware.publish({ action: action, data: args });
    }
  }, {
    key: 'ensurePage',
    value: function ensurePage(page) {
      return this.onDemandEntries.ensurePage(page);
    }
  }]);
>>>>>>> parent of b9f85a6... 又兼容了一把
  return HotReloader;
}();

exports.default = HotReloader;


function deleteCache(path) {
  delete require.cache[path];
}

function diff(a, b) {
<<<<<<< HEAD
  return new _set2.default([].concat(a).filter(function (v) {
=======
  return new _set2.default([].concat((0, _toConsumableArray3.default)(a)).filter(function (v) {
>>>>>>> parent of b9f85a6... 又兼容了一把
    return !b.has(v);
  }));
}

function toRoute(file) {
  var f = _path.sep === '\\' ? file.replace(/\\/g, '/') : file;
  return ('/' + f).replace(/(\/index)?\.js$/, '') || '/';
}