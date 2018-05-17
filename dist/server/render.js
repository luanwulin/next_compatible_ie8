'use strict';

exports.__esModule = true;
exports.renderScriptError = exports.renderScript = exports.renderError = exports.render = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var render = exports.render = function () {
  var _ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(req, res, pathname, query, opts) {
    var html;
    return _regenerator2['default'].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return renderToHTML(req, res, pathname, query, opts);

          case 2:
            html = _context.sent;

            sendHTML(req, res, html, req.method, opts);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function render(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var renderError = exports.renderError = function () {
  var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee2(err, req, res, pathname, query, opts) {
    var html;
    return _regenerator2['default'].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return renderErrorToHTML(err, req, res, query, opts);

          case 2:
            html = _context2.sent;

            sendHTML(req, res, html, req.method, opts);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function renderError(_x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref2.apply(this, arguments);
  };
}();

var doRender = function () {
  var _ref3 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee3(req, res, pathname, query) {
    var _ref4 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
        err = _ref4.err,
        page = _ref4.page,
        buildId = _ref4.buildId,
        buildStats = _ref4.buildStats,
        hotReloader = _ref4.hotReloader,
        assetPrefix = _ref4.assetPrefix,
        availableChunks = _ref4.availableChunks,
        _ref4$dir = _ref4.dir,
        dir = _ref4$dir === undefined ? process.cwd() : _ref4$dir,
        _ref4$dev = _ref4.dev,
        dev = _ref4$dev === undefined ? false : _ref4$dev,
        _ref4$staticMarkup = _ref4.staticMarkup,
        staticMarkup = _ref4$staticMarkup === undefined ? false : _ref4$staticMarkup,
        _ref4$nextExport = _ref4.nextExport,
        nextExport = _ref4$nextExport === undefined ? false : _ref4$nextExport;

    var dist, _ref5, Component, Document, asPath, ctx, props, renderPage, docProps, devBuildId, doc;

    return _regenerator2['default'].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            page = page || pathname;

            _context3.next = 3;
            return ensurePage(page, { dir: dir, hotReloader: hotReloader });

          case 3:
            dist = (0, _config2['default'])(dir).distDir;
            _context3.next = 6;
            return _promise2['default'].all([(0, _require2['default'])((0, _path.join)(dir, dist, 'dist', 'pages', page)), (0, _require2['default'])((0, _path.join)(dir, dist, 'dist', 'pages', '_document'))]);

          case 6:
            _ref5 = _context3.sent;
            Component = _ref5[0];
            Document = _ref5[1];

            Component = Component['default'] || Component;
            Document = Document['default'] || Document;
            asPath = req.url;
            ctx = { err: err, req: req, res: res, pathname: pathname, query: query, asPath: asPath };
            _context3.next = 15;
            return (0, _utils.loadGetInitialProps)(Component, ctx);

          case 15:
            props = _context3.sent;

            if (!res.finished) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt('return');

          case 18:
            renderPage = function renderPage() {
              var enhancer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (Page) {
                return Page;
              };

              var app = (0, _react.createElement)(_app2['default'], {
                Component: enhancer(Component),
                props: props,
                router: new _router.Router(pathname, query, asPath)
              });

              var render = staticMarkup ? _server.renderToStaticMarkup : _server.renderToString;

              var html = void 0;
              var head = void 0;
              var errorHtml = '';

              try {
                if (err && dev) {
                  errorHtml = render((0, _react.createElement)(_errorDebug2['default'], { error: err }));
                } else if (err) {
                  errorHtml = render(app);
                } else {
                  html = render(app);
                }
              } finally {
                head = _head2['default'].rewind() || (0, _head.defaultHead)();
              }
              var chunks = loadChunks({ dev: dev, dir: dir, dist: dist, availableChunks: availableChunks });

              return { html: html, head: head, errorHtml: errorHtml, chunks: chunks };
            };

            _context3.next = 21;
            return (0, _utils.loadGetInitialProps)(Document, (0, _extends3['default'])({}, ctx, { renderPage: renderPage }));

          case 21:
            docProps = _context3.sent;
            devBuildId = Date.now();

            if (!res.finished) {
              _context3.next = 25;
              break;
            }

            return _context3.abrupt('return');

          case 25:
            if (!(!Document.prototype || !Document.prototype.isReactComponent)) {
              _context3.next = 27;
              break;
            }

            throw new Error('_document.js is not exporting a React element');

          case 27:
            doc = (0, _react.createElement)(Document, (0, _extends3['default'])({
              __NEXT_DATA__: {
                props: props,
                pathname: pathname,
                query: query,
                buildId: dev ? devBuildId : buildId,
                buildStats: buildStats,
                assetPrefix: assetPrefix,
                nextExport: nextExport,
                err: err ? serializeError(dev, err) : null
              },
              dev: dev,
              dir: dir,
              staticMarkup: staticMarkup
            }, docProps));
            return _context3.abrupt('return', '<!DOCTYPE html>' + (0, _server.renderToStaticMarkup)(doc));

          case 29:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function doRender(_x14, _x15, _x16, _x17) {
    return _ref3.apply(this, arguments);
  };
}();

var renderScript = exports.renderScript = function () {
  var _ref6 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee4(req, res, page, opts) {
    var dist, path, realPath;
    return _regenerator2['default'].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            dist = (0, _config2['default'])(opts.dir).distDir;
            path = (0, _path.join)(opts.dir, dist, 'bundles', 'pages', page);
            _context4.next = 5;
            return (0, _resolve2['default'])(path);

          case 5:
            realPath = _context4.sent;
            _context4.next = 8;
            return serveStatic(req, res, realPath);

          case 8:
            _context4.next = 16;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4['catch'](0);

            if (!(_context4.t0.code === 'ENOENT')) {
              _context4.next = 15;
              break;
            }

            renderScriptError(req, res, page, _context4.t0, {}, opts);
            return _context4.abrupt('return');

          case 15:
            throw _context4.t0;

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 10]]);
  }));

  return function renderScript(_x19, _x20, _x21, _x22) {
    return _ref6.apply(this, arguments);
  };
}();

var renderScriptError = exports.renderScriptError = function () {
  var _ref8 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee5(req, res, page, error, customFields, _ref7) {
    var dev = _ref7.dev;
    var errorJson;
    return _regenerator2['default'].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            res.setHeader('Cache-Control', 'no-store, must-revalidate');

            page = _xssFilters2['default'].uriInSingleQuotedAttr(page);
            res.setHeader('Content-Type', 'text/javascript');

            if (!(error.code === 'ENOENT')) {
              _context5.next = 6;
              break;
            }

            res.end('\n      window.__NEXT_REGISTER_PAGE(\'' + page + '\', function() {\n        var error = new Error(\'Page does not exist: ' + page + '\')\n        error.statusCode = 404\n\n        return { error: error }\n      })\n    ');
            return _context5.abrupt('return');

          case 6:
            errorJson = (0, _extends3['default'])({}, serializeError(dev, error), customFields);


            res.end('\n    window.__NEXT_REGISTER_PAGE(\'' + page + '\', function() {\n      var error = ' + (0, _stringify2['default'])(errorJson) + '\n      return { error: error }\n    })\n  ');

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function renderScriptError(_x23, _x24, _x25, _x26, _x27, _x28) {
    return _ref8.apply(this, arguments);
  };
}();

var ensurePage = function () {
  var _ref11 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee6(page, _ref10) {
    var dir = _ref10.dir,
        hotReloader = _ref10.hotReloader;
    return _regenerator2['default'].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (hotReloader) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt('return');

          case 2:
            if (!(page === '_error' || page === '_document')) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt('return');

          case 4:
            _context6.next = 6;
            return hotReloader.ensurePage(page);

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function ensurePage(_x29, _x30) {
    return _ref11.apply(this, arguments);
  };
}();

exports.renderToHTML = renderToHTML;
exports.renderErrorToHTML = renderErrorToHTML;
exports.sendHTML = sendHTML;
exports.sendJSON = sendJSON;
exports.serveStatic = serveStatic;

var _path = require('path');

var _fs = require('fs');

var _react = require('react');

var _server = require('react-dom/server');

var _send = require('send');

var _send2 = _interopRequireDefault(_send);

var _etag = require('etag');

var _etag2 = _interopRequireDefault(_etag);

var _fresh = require('fresh');

var _fresh2 = _interopRequireDefault(_fresh);

var _require = require('./require');

var _require2 = _interopRequireDefault(_require);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _router = require('../lib/router');

var _utils = require('../lib/utils');

var _head = require('../lib/head');

var _head2 = _interopRequireDefault(_head);

var _app = require('../lib/app');

var _app2 = _interopRequireDefault(_app);

var _errorDebug = require('../lib/error-debug');

var _errorDebug2 = _interopRequireDefault(_errorDebug);

var _dynamic = require('../lib/dynamic');

var _xssFilters = require('xss-filters');

var _xssFilters2 = _interopRequireDefault(_xssFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function renderToHTML(req, res, pathname, query, opts) {
  return doRender(req, res, pathname, query, opts);
}

function renderErrorToHTML(err, req, res, pathname, query) {
  var opts = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  return doRender(req, res, pathname, query, (0, _extends3['default'])({}, opts, { err: err, page: '_error' }));
}

function sendHTML(req, res, html, method, _ref9) {
  var dev = _ref9.dev;

  if (res.finished) return;
  var etag = (0, _etag2['default'])(html);

  if ((0, _fresh2['default'])(req.headers, { etag: etag })) {
    res.statusCode = 304;
    res.end();
    return;
  }

  if (dev) {
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
  }

  res.setHeader('ETag', etag);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(method === 'HEAD' ? null : html);
}

function sendJSON(res, obj, method) {
  if (res.finished) return;

  var json = (0, _stringify2['default'])(obj);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(json));
  res.end(method === 'HEAD' ? null : json);
}

function errorToJSON(err) {
  var name = err.name,
      message = err.message,
      stack = err.stack;

  var json = { name: name, message: message, stack: stack };

  if (err.module) {
    var rawRequest = err.module.rawRequest;

    json.module = { rawRequest: rawRequest };
  }

  return json;
}

function serializeError(dev, err) {
  if (dev) {
    return errorToJSON(err);
  }

  return { message: '500 - Internal Server Error.' };
}

function serveStatic(req, res, path) {
  return new _promise2['default'](function (resolve, reject) {
    (0, _send2['default'])(req, path).on('directory', function () {
      var err = new Error('No directory access');
      err.code = 'ENOENT';
      reject(err);
    }).on('error', reject).pipe(res).on('finish', resolve);
  });
}

function loadChunks(_ref12) {
  var dev = _ref12.dev,
      dir = _ref12.dir,
      dist = _ref12.dist,
      availableChunks = _ref12.availableChunks;

  var flushedChunks = (0, _dynamic.flushChunks)();
  var validChunks = [];

  for (var _iterator = flushedChunks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3['default'])(_iterator);;) {
    var _ref13;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref13 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref13 = _i.value;
    }

    var chunk = _ref13;

    var filename = (0, _path.join)(dir, dist, 'chunks', chunk);
    var exists = dev ? (0, _fs.existsSync)(filename) : availableChunks[chunk];
    if (exists) {
      validChunks.push(chunk);
    }
  }

  return validChunks;
}