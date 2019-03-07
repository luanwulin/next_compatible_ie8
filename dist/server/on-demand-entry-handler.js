"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = onDemandEntryHandler;
exports.normalizePage = normalizePage;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/date/now"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _isArray5 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol"));

var _DynamicEntryPlugin = _interopRequireDefault(require("webpack/lib/DynamicEntryPlugin"));

var _events = require("events");

var _path = require("path");

var _url = require("url");

var _fs = _interopRequireDefault(require("fs"));

var _promisify = _interopRequireDefault(require("../lib/promisify"));

var _glob = _interopRequireDefault(require("glob"));

var _require = require("./require");

var _utils = require("../build/webpack/utils");

var _constants = require("../lib/constants");

var ADDED = (0, _symbol["default"])('added');
var BUILDING = (0, _symbol["default"])('building');
var BUILT = (0, _symbol["default"])('built');
var glob = (0, _promisify["default"])(_glob["default"]);
var access = (0, _promisify["default"])(_fs["default"].access); // Based on https://github.com/webpack/webpack/blob/master/lib/DynamicEntryPlugin.js#L29-L37

function addEntry(compilation, context, name, entry) {
  return new _promise["default"](function (resolve, reject) {
    var dep = _DynamicEntryPlugin["default"].createDependency(entry, name);

    compilation.addEntry(context, dep, name, function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function onDemandEntryHandler(devMiddleware, multiCompiler, _ref) {
  var buildId = _ref.buildId,
      dir = _ref.dir,
      dev = _ref.dev,
      reload = _ref.reload,
      pageExtensions = _ref.pageExtensions,
      _ref$maxInactiveAge = _ref.maxInactiveAge,
      maxInactiveAge = _ref$maxInactiveAge === void 0 ? 1000 * 60 : _ref$maxInactiveAge,
      _ref$pagesBufferLengt = _ref.pagesBufferLength,
      pagesBufferLength = _ref$pagesBufferLengt === void 0 ? 2 : _ref$pagesBufferLengt;
  var compilers = multiCompiler.compilers;
  var invalidator = new Invalidator(devMiddleware, multiCompiler);
  var entries = {};
  var lastAccessPages = [''];
  var doneCallbacks = new _events.EventEmitter();
  var reloading = false;
  var stopped = false;
  var reloadCallbacks = new _events.EventEmitter();

  var _loop = function _loop() {
    if (_isArray) {
      if (_i >= _iterator.length) return "break";
      _ref2 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) return "break";
      _ref2 = _i.value;
    }

    var compiler = _ref2;
    compiler.hooks.make.tapPromise('NextJsOnDemandEntries', function (compilation) {
      invalidator.startBuilding();
      var allEntries = (0, _keys["default"])(entries).map(
      /*#__PURE__*/
      function () {
        var _ref5 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee2(page) {
          var _entries$page, name, entry, files, _iterator3, _isArray3, _i3, _ref6, file;

          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _entries$page = entries[page], name = _entries$page.name, entry = _entries$page.entry;
                  files = (0, _isArray5["default"])(entry) ? entry : [entry]; // Is just one item. But it's passed as an array.

                  _iterator3 = files, _isArray3 = (0, _isArray5["default"])(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator2["default"])(_iterator3);

                case 3:
                  if (!_isArray3) {
                    _context2.next = 9;
                    break;
                  }

                  if (!(_i3 >= _iterator3.length)) {
                    _context2.next = 6;
                    break;
                  }

                  return _context2.abrupt("break", 26);

                case 6:
                  _ref6 = _iterator3[_i3++];
                  _context2.next = 13;
                  break;

                case 9:
                  _i3 = _iterator3.next();

                  if (!_i3.done) {
                    _context2.next = 12;
                    break;
                  }

                  return _context2.abrupt("break", 26);

                case 12:
                  _ref6 = _i3.value;

                case 13:
                  file = _ref6;
                  _context2.prev = 14;
                  _context2.next = 17;
                  return access((0, _path.join)(dir, file), (_fs["default"].constants || _fs["default"]).W_OK);

                case 17:
                  _context2.next = 24;
                  break;

                case 19:
                  _context2.prev = 19;
                  _context2.t0 = _context2["catch"](14);
                  console.warn('Page was removed', page);
                  delete entries[page];
                  return _context2.abrupt("return");

                case 24:
                  _context2.next = 3;
                  break;

                case 26:
                  entries[page].status = BUILDING;
                  return _context2.abrupt("return", addEntry(compilation, compiler.context, name, entry));

                case 28:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[14, 19]]);
        }));

        return function (_x2) {
          return _ref5.apply(this, arguments);
        };
      }());
      return _promise["default"].all(allEntries);
    });
  };

  for (var _iterator = compilers, _isArray = (0, _isArray5["default"])(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator2["default"])(_iterator);;) {
    var _ref2;

    var _ret = _loop();

    if (_ret === "break") break;
  }

  multiCompiler.hooks.done.tap('NextJsOnDemandEntries', function (multiStats) {
    var clientStats = multiStats.stats[0];
    var compilation = clientStats.compilation;
    var hardFailedPages = compilation.errors.filter(function (e) {
      // Make sure to only pick errors which marked with missing modules
      var hasNoModuleFoundError = /ENOENT/.test(e.message) || /Module not found/.test(e.message);
      if (!hasNoModuleFoundError) return false; // The page itself is missing. So this is a failed page.

      if (_constants.IS_BUNDLED_PAGE_REGEX.test(e.module.name)) return true; // No dependencies means this is a top level page.
      // So this is a failed page.

      return e.module.dependencies.length === 0;
    }).map(function (e) {
      return e.module.chunks;
    }).reduce(function (a, b) {
      return [].concat(a, b);
    }, []).map(function (c) {
      var pageName = _constants.ROUTE_NAME_REGEX.exec(c.name)[1];

      return normalizePage("/" + pageName);
    }); // compilation.entrypoints is a Map object, so iterating over it 0 is the key and 1 is the value

    for (var _iterator2 = compilation.entrypoints.entries(), _isArray2 = (0, _isArray5["default"])(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator2["default"])(_iterator2);;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var _ref4 = _ref3,
          entrypoint = _ref4[1];

      var result = _constants.ROUTE_NAME_REGEX.exec(entrypoint.name);

      if (!result) {
        continue;
      }

      var pagePath = result[1];

      if (!pagePath) {
        continue;
      }

      var page = normalizePage('/' + pagePath);
      var entry = entries[page];

      if (!entry) {
        continue;
      }

      if (entry.status !== BUILDING) {
        continue;
      }

      entry.status = BUILT;
      entry.lastActiveTime = (0, _now["default"])();
      doneCallbacks.emit(page);
    }

    invalidator.doneBuilding();

    if (hardFailedPages.length > 0 && !reloading) {
      console.log("> Reloading webpack due to inconsistant state of pages(s): " + hardFailedPages.join(', '));
      reloading = true;
      reload().then(function () {
        console.log('> Webpack reloaded.');
        reloadCallbacks.emit('done');
        stop();
      })["catch"](function (err) {
        console.error("> Webpack reloading failed: " + err.message);
        console.error(err.stack);
        process.exit(1);
      });
    }
  });
  var disposeHandler = setInterval(function () {
    if (stopped) return;
    disposeInactiveEntries(devMiddleware, entries, lastAccessPages, maxInactiveAge);
  }, 5000);
  disposeHandler.unref();

  function stop() {
    clearInterval(disposeHandler);
    stopped = true;
    doneCallbacks = null;
    reloadCallbacks = null;
  }

  return {
    waitUntilReloaded: function waitUntilReloaded() {
      if (!reloading) return _promise["default"].resolve(true);
      return new _promise["default"](function (resolve) {
        reloadCallbacks.once('done', function () {
          resolve();
        });
      });
    },
    ensurePage: function () {
      var _ensurePage = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(page) {
        var normalizedPagePath, extensions, paths, relativePathToPage, pathname, _createEntry, name, files;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.waitUntilReloaded();

              case 2:
                page = normalizePage(page);
                _context.prev = 3;
                normalizedPagePath = (0, _require.normalizePagePath)(page);
                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](3);
                console.error(_context.t0);
                throw (0, _require.pageNotFoundError)(normalizedPagePath);

              case 11:
                extensions = pageExtensions.join('|');
                _context.next = 14;
                return glob("pages/{" + normalizedPagePath + "/index," + normalizedPagePath + "}.+(" + extensions + ")", {
                  cwd: dir
                });

              case 14:
                paths = _context.sent;

                if (!(paths.length === 0)) {
                  _context.next = 17;
                  break;
                }

                throw (0, _require.pageNotFoundError)(normalizedPagePath);

              case 17:
                relativePathToPage = paths[0];
                pathname = (0, _path.join)(dir, relativePathToPage);
                _createEntry = (0, _utils.createEntry)(relativePathToPage, {
                  buildId: buildId,
                  pageExtensions: extensions
                }), name = _createEntry.name, files = _createEntry.files;
                _context.next = 22;
                return new _promise["default"](function (resolve, reject) {
                  var entryInfo = entries[page];

                  if (entryInfo) {
                    if (entryInfo.status === BUILT) {
                      resolve();
                      return;
                    }

                    if (entryInfo.status === BUILDING) {
                      doneCallbacks.once(page, handleCallback);
                      return;
                    }
                  }

                  console.log("> Building page: " + page);
                  entries[page] = {
                    name: name,
                    entry: files,
                    pathname: pathname,
                    status: ADDED
                  };
                  doneCallbacks.once(page, handleCallback);
                  invalidator.invalidate();

                  function handleCallback(err) {
                    if (err) return reject(err);
                    resolve();
                  }
                });

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 7]]);
      }));

      function ensurePage(_x) {
        return _ensurePage.apply(this, arguments);
      }

      return ensurePage;
    }(),
    middleware: function middleware() {
      var _this = this;

      return function (req, res, next) {
        if (stopped) {
          // If this handler is stopped, we need to reload the user's browser.
          // So the user could connect to the actually running handler.
          res.statusCode = 302;
          res.setHeader('Location', req.url);
          res.end('302');
        } else if (reloading) {
          // Webpack config is reloading. So, we need to wait until it's done and
          // reload user's browser.
          // So the user could connect to the new handler and webpack setup.
          _this.waitUntilReloaded().then(function () {
            res.statusCode = 302;
            res.setHeader('Location', req.url);
            res.end('302');
          });
        } else {
          if (!/^\/_next\/on-demand-entries-ping/.test(req.url)) return next();

          var _parse = (0, _url.parse)(req.url, true),
              query = _parse.query;

          var page = normalizePage(query.page);
          var entryInfo = entries[page]; // If there's no entry.
          // Then it seems like an weird issue.

          if (!entryInfo) {
            var message = "Client pings, but there's no entry for page: " + page;
            console.error(message);
            sendJson(res, {
              invalid: true
            });
            return;
          }

          sendJson(res, {
            success: true
          }); // We don't need to maintain active state of anything other than BUILT entries

          if (entryInfo.status !== BUILT) return; // If there's an entryInfo

          if (!lastAccessPages.includes(page)) {
            lastAccessPages.unshift(page); // Maintain the buffer max length

            if (lastAccessPages.length > pagesBufferLength) lastAccessPages.pop();
          }

          entryInfo.lastActiveTime = (0, _now["default"])();
        }
      };
    }
  };
}

function disposeInactiveEntries(devMiddleware, entries, lastAccessPages, maxInactiveAge) {
  var disposingPages = [];
  (0, _keys["default"])(entries).forEach(function (page) {
    var _entries$page2 = entries[page],
        lastActiveTime = _entries$page2.lastActiveTime,
        status = _entries$page2.status; // This means this entry is currently building or just added
    // We don't need to dispose those entries.

    if (status !== BUILT) return; // We should not build the last accessed page even we didn't get any pings
    // Sometimes, it's possible our XHR ping to wait before completing other requests.
    // In that case, we should not dispose the current viewing page

    if (lastAccessPages.includes(page)) return;

    if ((0, _now["default"])() - lastActiveTime > maxInactiveAge) {
      disposingPages.push(page);
    }
  });

  if (disposingPages.length > 0) {
    disposingPages.forEach(function (page) {
      delete entries[page];
    });
    console.log("> Disposing inactive page(s): " + disposingPages.join(', '));
    devMiddleware.invalidate();
  }
} // /index and / is the same. So, we need to identify both pages as the same.
// This also applies to sub pages as well.


function normalizePage(page) {
  var unixPagePath = page.replace(/\\/g, '/');

  if (unixPagePath === '/index' || unixPagePath === '/') {
    return '/';
  }

  return unixPagePath.replace(/\/index$/, '');
}

function sendJson(res, payload) {
  res.setHeader('Content-Type', 'application/json');
  res.status = 200;
  res.end((0, _stringify["default"])(payload));
} // Make sure only one invalidation happens at a time
// Otherwise, webpack hash gets changed and it'll force the client to reload.


var Invalidator =
/*#__PURE__*/
function () {
  function Invalidator(devMiddleware, multiCompiler) {
    this.multiCompiler = multiCompiler;
    this.devMiddleware = devMiddleware; // contains an array of types of compilers currently building

    this.building = false;
    this.rebuildAgain = false;
  }

  var _proto = Invalidator.prototype;

  _proto.invalidate = function invalidate() {
    // If there's a current build is processing, we won't abort it by invalidating.
    // (If aborted, it'll cause a client side hard reload)
    // But let it to invalidate just after the completion.
    // So, it can re-build the queued pages at once.
    if (this.building) {
      this.rebuildAgain = true;
      return;
    }

    this.building = true; // Work around a bug in webpack, calling `invalidate` on Watching.js
    // doesn't trigger the invalid call used to keep track of the `.done` hook on multiCompiler

    for (var _iterator4 = this.multiCompiler.compilers, _isArray4 = (0, _isArray5["default"])(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator2["default"])(_iterator4);;) {
      var _ref7;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref7 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref7 = _i4.value;
      }

      var compiler = _ref7;
      compiler.hooks.invalid.call();
    }

    this.devMiddleware.invalidate();
  };

  _proto.startBuilding = function startBuilding() {
    this.building = true;
  };

  _proto.doneBuilding = function doneBuilding() {
    this.building = false;

    if (this.rebuildAgain) {
      this.rebuildAgain = false;
      this.invalidate();
    }
  };

  return Invalidator;
}();