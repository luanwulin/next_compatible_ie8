'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var HotReloader = function () {
  function HotReloader(dir) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        quiet = _ref.quiet,
        conf = _ref.conf;

    (0, _classCallCheck3['default'])(this, HotReloader);

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

    this.buildId = _uuid2['default'].v4();

    this.config = (0, _config2['default'])(dir, conf);
  }

  HotReloader.prototype.run = function () {
    var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(req, res) {
      var _this = this;

      var _loop, _iterator, _isArray, _i, _ref3, fn;

      return _regenerator2['default'].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _loop = _regenerator2['default'].mark(function _loop(fn) {
                return _regenerator2['default'].wrap(function _loop$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return new _promise2['default'](function (resolve, reject) {
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
              _iterator = this.middlewares, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3['default'])(_iterator);

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
    var _ref4 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee2() {
      var _ref5, compiler, buildTools;

      return _regenerator2['default'].wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _promise2['default'].all([(0, _webpack2['default'])(this.dir, { buildId: this.buildId, dev: true, quiet: this.quiet }), (0, _clean2['default'])(this.dir)]);

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
    var _ref6 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee3(webpackDevMiddleware) {
      var middleware;
      return _regenerator2['default'].wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              middleware = webpackDevMiddleware || this.webpackDevMiddleware;

              if (!middleware) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt('return', new _promise2['default'](function (resolve, reject) {
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
    var _ref7 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee4() {
      var _ref8, compiler, buildTools, oldWebpackDevMiddleware;

      return _regenerator2['default'].wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.stats = null;

              _context5.next = 3;
              return _promise2['default'].all([(0, _webpack2['default'])(this.dir, { buildId: this.buildId, dev: true, quiet: this.quiet }), (0, _clean2['default'])(this.dir)]);

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
    var _ref10 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee5(compiler) {
      var _this2 = this;

      var ignored, webpackDevMiddlewareConfig, webpackDevMiddleware, webpackHotMiddleware, onDemandEntries;
      return _regenerator2['default'].wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              compiler.plugin('after-emit', function (compilation, callback) {
                var assets = compilation.assets;


                if (_this2.prevAssets) {
                  for (var _iterator2 = (0, _keys2['default'])(assets), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3['default'])(_iterator2);;) {
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
                  for (var _iterator3 = (0, _keys2['default'])(_this2.prevAssets), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3['default'])(_iterator3);;) {
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

                var chunkNames = new _set2['default'](compilation.chunks.map(function (c) {
                  return c.name;
                }).filter(function (name) {
                  return _utils.IS_BUNDLED_PAGE.test(name);
                }));

                var failedChunkNames = new _set2['default'](compilation.errors.map(function (e) {
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

                var chunkHashes = new _map2['default'](compilation.chunks.filter(function (c) {
                  return _utils.IS_BUNDLED_PAGE.test(c.name);
                }).map(function (c) {
                  return [c.name, c.hash];
                }));

                if (_this2.initialized) {
                  var added = diff(chunkNames, _this2.prevChunkNames);
                  var removed = diff(_this2.prevChunkNames, chunkNames);
                  var succeeded = diff(_this2.prevFailedChunkNames, failedChunkNames);

                  var failed = failedChunkNames;

                  var rootDir = (0, _path.join)('bundles', 'pages');

                  for (var _iterator4 = new _set2['default']([].concat(added, removed, failed, succeeded)), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3['default'])(_iterator4);;) {
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

                  for (var _iterator5 = chunkHashes, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3['default'])(_iterator5);;) {
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

              ignored = [/(^|[/\\])\../, /node_modules/];
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

              webpackDevMiddleware = (0, _webpackDevMiddleware2['default'])(compiler, webpackDevMiddlewareConfig);
              webpackHotMiddleware = (0, _webpackHotMiddleware2['default'])(compiler, {
                path: '/_next/webpack-hmr',
                log: false,
                heartbeat: 2500
              });
              onDemandEntries = (0, _onDemandEntryHandler2['default'])(webpackDevMiddleware, compiler, (0, _extends3['default'])({
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
    return new _promise2['default'](function (resolve) {
      middleware.waitUntilValid(resolve);
    });
  };

  HotReloader.prototype.getCompilationErrors = function () {
    var _ref16 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee6() {
      var _stats$compilation, compiler, errors, _iterator6, _isArray6, _i6, _ref17, err, _iterator7, _isArray7, _i7, _ref18, r, _iterator8, _isArray8, _i8, _ref19, c, path, _errors;

      return _regenerator2['default'].wrap(function _callee6$(_context7) {
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

              this.compilationErrors = new _map2['default']();

              if (!this.stats.hasErrors()) {
                _context7.next = 51;
                break;
              }

              _stats$compilation = this.stats.compilation, compiler = _stats$compilation.compiler, errors = _stats$compilation.errors;
              _iterator6 = errors, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3['default'])(_iterator6);

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
              _iterator7 = err.module.reasons, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3['default'])(_iterator7);

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
              _iterator8 = r.module.chunks, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3['default'])(_iterator8);

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

  return HotReloader;
}();

exports['default'] = HotReloader;


function deleteCache(path) {
  delete require.cache[path];
}

function diff(a, b) {
  return new _set2['default']([].concat(a).filter(function (v) {
    return !b.has(v);
  }));
}

function toRoute(file) {
  var f = _path.sep === '\\' ? file.replace(/\\/g, '/') : file;
  return ('/' + f).replace(/(\/index)?\.js$/, '') || '/';
}