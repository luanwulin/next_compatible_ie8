'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

exports['default'] = onDemandEntryHandler;

var _DynamicEntryPlugin = require('webpack/lib/DynamicEntryPlugin');

var _DynamicEntryPlugin2 = _interopRequireDefault(_DynamicEntryPlugin);

var _events = require('events');

var _path = require('path');

var _url = require('url');

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _touch = require('touch');

var _touch2 = _interopRequireDefault(_touch);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ADDED = (0, _symbol2['default'])('added');
var BUILDING = (0, _symbol2['default'])('building');
var BUILT = (0, _symbol2['default'])('built');

function onDemandEntryHandler(devMiddleware, compiler, _ref) {
  var dir = _ref.dir,
      dev = _ref.dev,
      reload = _ref.reload,
      _ref$maxInactiveAge = _ref.maxInactiveAge,
      maxInactiveAge = _ref$maxInactiveAge === undefined ? 1000 * 25 : _ref$maxInactiveAge,
      _ref$pagesBufferLengt = _ref.pagesBufferLength,
      pagesBufferLength = _ref$pagesBufferLengt === undefined ? 2 : _ref$pagesBufferLengt;

  var entries = {};
  var lastAccessPages = [''];
  var doneCallbacks = new _events.EventEmitter();
  var invalidator = new Invalidator(devMiddleware);
  var touchedAPage = false;
  var reloading = false;
  var stopped = false;
  var reloadCallbacks = new _events.EventEmitter();

  compiler.plugin('make', function (compilation, done) {
    var _this = this;

    invalidator.startBuilding();

    var allEntries = (0, _keys2['default'])(entries).map(function (page) {
      var _entries$page = entries[page],
          name = _entries$page.name,
          entry = _entries$page.entry;

      entries[page].status = BUILDING;
      return addEntry(compilation, _this.context, name, entry);
    });

    _promise2['default'].all(allEntries).then(function () {
      return done();
    })['catch'](done);
  });

  compiler.plugin('done', function (stats) {
    var compilation = stats.compilation;

    var hardFailedPages = compilation.errors.filter(function (e) {
      var hasNoModuleFoundError = /ENOENT/.test(e.message) || /Module not found/.test(e.message);
      if (!hasNoModuleFoundError) return false;

      if (_utils.IS_BUNDLED_PAGE.test(e.module.name)) return true;

      return e.module.dependencies.length === 0;
    }).map(function (e) {
      return e.module.chunks;
    }).reduce(function (a, b) {
      return [].concat(a, b);
    }, []).map(function (c) {
      var pageName = _utils.MATCH_ROUTE_NAME.exec(c.name)[1];
      return normalizePage('/' + pageName);
    });

    (0, _keys2['default'])(entries).forEach(function (page) {
      var entryInfo = entries[page];
      if (entryInfo.status !== BUILDING) return;

      if (!touchedAPage) {
        setTimeout(function () {
          _touch2['default'].sync(entryInfo.pathname);
        }, 1000);
        touchedAPage = true;
      }

      entryInfo.status = BUILT;
      entries[page].lastActiveTime = Date.now();
      doneCallbacks.emit(page);
    });

    invalidator.doneBuilding();

    if (hardFailedPages.length > 0 && !reloading) {
      console.log('> Reloading webpack due to inconsistant state of pages(s): ' + hardFailedPages.join(', '));
      reloading = true;
      reload().then(function () {
        console.log('> Webpack reloaded.');
        reloadCallbacks.emit('done');
        stop();
      })['catch'](function (err) {
        console.error('> Webpack reloading failed: ' + err.message);
        console.error(err.stack);
        process.exit(1);
      });
    }
  });

  var disposeHandler = setInterval(function () {
    if (stopped) return;
    disposeInactiveEntries(devMiddleware, entries, lastAccessPages, maxInactiveAge);
  }, 5000);

  function stop() {
    clearInterval(disposeHandler);
    stopped = true;
    doneCallbacks = null;
    reloadCallbacks = null;
  }

  return {
    waitUntilReloaded: function waitUntilReloaded() {
      if (!reloading) return _promise2['default'].resolve(true);
      return new _promise2['default'](function (resolve) {
        reloadCallbacks.once('done', function () {
          resolve();
        });
      });
    },
    ensurePage: function () {
      var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(page) {
        var pagePath, pathname, name, entry;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.waitUntilReloaded();

              case 2:
                page = normalizePage(page);

                pagePath = (0, _path.join)(dir, 'pages', page);
                _context.next = 6;
                return (0, _resolve2['default'])(pagePath);

              case 6:
                pathname = _context.sent;
                name = (0, _path.join)('bundles', pathname.substring(dir.length));
                entry = [pathname + '?entry'];
                _context.next = 11;
                return new _promise2['default'](function (resolve, reject) {
                  var entryInfo = entries[page];

                  if (entryInfo) {
                    if (entryInfo.status === BUILT) {
                      resolve();
                      return;
                    }

                    if (entryInfo.status === BUILDING) {
                      doneCallbacks.on(page, processCallback);
                      return;
                    }
                  }

                  console.log('> Building page: ' + page);

                  entries[page] = { name: name, entry: entry, pathname: pathname, status: ADDED };
                  doneCallbacks.on(page, processCallback);

                  invalidator.invalidate();

                  function processCallback(err) {
                    if (err) return reject(err);
                    resolve();
                  }
                });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ensurePage(_x) {
        return _ref2.apply(this, arguments);
      }

      return ensurePage;
    }(),
    middleware: function middleware() {
      var _this2 = this;

      return function (req, res, next) {
        if (stopped) {
          res.statusCode = 302;
          res.setHeader('Location', req.url);
          res.end('302');
        } else if (reloading) {
          _this2.waitUntilReloaded().then(function () {
            res.statusCode = 302;
            res.setHeader('Location', req.url);
            res.end('302');
          });
        } else {
          if (!/^\/_next\/on-demand-entries-ping/.test(req.url)) return next();

          var _parse = (0, _url.parse)(req.url, true),
              query = _parse.query;

          var page = normalizePage(query.page);
          var entryInfo = entries[page];

          if (!entryInfo) {
            var message = 'Client pings, but there\'s no entry for page: ' + page;
            console.error(message);
            sendJson(res, { invalid: true });
            return;
          }

          sendJson(res, { success: true });

          if (entryInfo.status !== BUILT) return;

          if (!lastAccessPages.includes(page)) {
            lastAccessPages.unshift(page);

            if (lastAccessPages.length > pagesBufferLength) lastAccessPages.pop();
          }
          entryInfo.lastActiveTime = Date.now();
        }
      };
    }
  };
}

function addEntry(compilation, context, name, entry) {
  return new _promise2['default'](function (resolve, reject) {
    var dep = _DynamicEntryPlugin2['default'].createDependency(entry, name);
    compilation.addEntry(context, dep, name, function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function disposeInactiveEntries(devMiddleware, entries, lastAccessPages, maxInactiveAge) {
  var disposingPages = [];

  (0, _keys2['default'])(entries).forEach(function (page) {
    var _entries$page2 = entries[page],
        lastActiveTime = _entries$page2.lastActiveTime,
        status = _entries$page2.status;

    if (status !== BUILT) return;

    if (lastAccessPages.includes(page)) return;

    if (Date.now() - lastActiveTime > maxInactiveAge) {
      disposingPages.push(page);
    }
  });

  if (disposingPages.length > 0) {
    disposingPages.forEach(function (page) {
      delete entries[page];
    });
    console.log('> Disposing inactive page(s): ' + disposingPages.join(', '));
    devMiddleware.invalidate();
  }
}

function normalizePage(page) {
  return page.replace(/\/index$/, '/');
}

function sendJson(res, payload) {
  res.setHeader('Content-Type', 'application/json');
  res.status = 200;
  res.end((0, _stringify2['default'])(payload));
}

var Invalidator = function () {
  function Invalidator(devMiddleware) {
    (0, _classCallCheck3['default'])(this, Invalidator);

    this.devMiddleware = devMiddleware;
    this.building = false;
    this.rebuildAgain = false;
  }

  Invalidator.prototype.invalidate = function invalidate() {
    if (this.building) {
      this.rebuildAgain = true;
      return;
    }

    this.building = true;
    this.devMiddleware.invalidate();
  };

  Invalidator.prototype.startBuilding = function startBuilding() {
    this.building = true;
  };

  Invalidator.prototype.doneBuilding = function doneBuilding() {
    this.building = false;
    if (this.rebuildAgain) {
      this.rebuildAgain = false;
      this.invalidate();
    }
  };

  return Invalidator;
}();

module.exports = exports['default'];