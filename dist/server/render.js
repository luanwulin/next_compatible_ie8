"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.render = render;
exports.renderToHTML = renderToHTML;
exports.renderError = renderError;
exports.renderErrorToHTML = renderErrorToHTML;
exports.renderScriptError = renderScriptError;
exports.sendHTML = sendHTML;
exports.serveStatic = serveStatic;

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _path = require("path");

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _send = _interopRequireDefault(require("send"));

var _etag = _interopRequireDefault(require("etag"));

var _fresh = _interopRequireDefault(require("fresh"));

var _require = _interopRequireWildcard(require("./require"));

var _router = require("../lib/router");

var _utils = require("../lib/utils");

var _head = _interopRequireWildcard(require("../lib/head"));

var _errorDebug = _interopRequireDefault(require("../lib/error-debug"));

var _loadable = _interopRequireDefault(require("../lib/loadable"));

var _loadableCapture = _interopRequireDefault(require("../lib/loadable-capture"));

var _constants = require("../lib/constants");

// Based on https://github.com/jamiebuilds/react-loadable/pull/132
function getDynamicImportBundles(manifest, moduleIds) {
  return moduleIds.reduce(function (bundles, moduleId) {
    if (typeof manifest[moduleId] === 'undefined') {
      return bundles;
    }

    return bundles.concat(manifest[moduleId]);
  }, []);
}

var logger = console;

function render(_x, _x2, _x3, _x4, _x5) {
  return _render.apply(this, arguments);
}

function _render() {
  _render = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, pathname, query, opts) {
    var html;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return renderToHTML(req, res, pathname, query, opts);

          case 2:
            html = _context.sent;
            sendHTML(req, res, html, req.method, opts);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _render.apply(this, arguments);
}

function renderToHTML(req, res, pathname, query, opts) {
  return doRender(req, res, pathname, query, opts);
}

function renderError(_x6, _x7, _x8, _x9, _x10, _x11) {
  return _renderError.apply(this, arguments);
}

function _renderError() {
  _renderError = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(err, req, res, pathname, query, opts) {
    var html;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return renderErrorToHTML(err, req, res, query, opts);

          case 2:
            html = _context2.sent;
            sendHTML(req, res, html, req.method, opts);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _renderError.apply(this, arguments);
}

function renderErrorToHTML(err, req, res, pathname, query, opts) {
  if (opts === void 0) {
    opts = {};
  }

  return doRender(req, res, pathname, query, (0, _objectSpread2["default"])({}, opts, {
    err: err,
    page: '/_error'
  }));
}

function getPageFiles(buildManifest, page) {
  var normalizedPage = (0, _require.normalizePagePath)(page);
  var files = buildManifest.pages[normalizedPage];

  if (!files) {
    console.warn("Could not find files for " + normalizedPage + " in .next/build-manifest.json");
    return [];
  }

  return files;
}

function doRender(_x12, _x13, _x14, _x15, _x16) {
  return _doRender.apply(this, arguments);
}

function _doRender() {
  _doRender = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res, pathname, query, _temp) {
    var _ref2, err, page, buildId, hotReloader, assetPrefix, runtimeConfig, distDir, dir, _ref2$dev, dev, _ref2$staticMarkup, staticMarkup, nextExport, documentPath, appPath, _ref3, buildManifest, reactLoadableManifest, Component, Document, App, asPath, ctx, router, props, devFiles, files, reactLoadableModules, renderPage, docProps, dynamicImports, dynamicImportsIds, doc;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref2 = _temp === void 0 ? {} : _temp, err = _ref2.err, page = _ref2.page, buildId = _ref2.buildId, hotReloader = _ref2.hotReloader, assetPrefix = _ref2.assetPrefix, runtimeConfig = _ref2.runtimeConfig, distDir = _ref2.distDir, dir = _ref2.dir, _ref2$dev = _ref2.dev, dev = _ref2$dev === void 0 ? false : _ref2$dev, _ref2$staticMarkup = _ref2.staticMarkup, staticMarkup = _ref2$staticMarkup === void 0 ? false : _ref2$staticMarkup, nextExport = _ref2.nextExport;
            page = page || pathname; // In dev mode we use on demand entries to compile the page before rendering

            if (!hotReloader) {
              _context3.next = 5;
              break;
            }

            _context3.next = 5;
            return hotReloader.ensurePage(page);

          case 5:
            documentPath = (0, _path.join)(distDir, _constants.SERVER_DIRECTORY, _constants.CLIENT_STATIC_FILES_PATH, buildId, 'pages', '_document');
            appPath = (0, _path.join)(distDir, _constants.SERVER_DIRECTORY, _constants.CLIENT_STATIC_FILES_PATH, buildId, 'pages', '_app');
            _context3.next = 9;
            return _promise["default"].all([require((0, _path.join)(distDir, _constants.BUILD_MANIFEST)), require((0, _path.join)(distDir, _constants.REACT_LOADABLE_MANIFEST)), (0, _require["default"])(page, {
              distDir: distDir
            }), require(documentPath), require(appPath)]);

          case 9:
            _ref3 = _context3.sent;
            buildManifest = _ref3[0];
            reactLoadableManifest = _ref3[1];
            Component = _ref3[2];
            Document = _ref3[3];
            App = _ref3[4];
            Component = Component["default"] || Component;

            if (!(typeof Component !== 'function')) {
              _context3.next = 18;
              break;
            }

            throw new Error("The default export is not a React Component in page: \"" + pathname + "\"");

          case 18:
            App = App["default"] || App;
            Document = Document["default"] || Document;
            asPath = req.url;
            ctx = {
              err: err,
              req: req,
              res: res,
              pathname: pathname,
              query: query,
              asPath: asPath
            };
            router = new _router.Router(pathname, query, asPath);
            _context3.next = 25;
            return (0, _utils.loadGetInitialProps)(App, {
              Component: Component,
              router: router,
              ctx: ctx
            });

          case 25:
            props = _context3.sent;
            devFiles = buildManifest.devFiles;
            files = [].concat(new _set["default"]([].concat(getPageFiles(buildManifest, page), getPageFiles(buildManifest, '/_app'), getPageFiles(buildManifest, '/_error')))); // the response might be finshed on the getinitialprops call

            if (!(0, _utils.isResSent)(res)) {
              _context3.next = 30;
              break;
            }

            return _context3.abrupt("return");

          case 30:
            reactLoadableModules = [];

            renderPage = function renderPage(options) {
              if (options === void 0) {
                options = function options(Page) {
                  return Page;
                };
              }

              var EnhancedApp = App;
              var EnhancedComponent = Component; // For backwards compatibility

              if (typeof options === 'function') {
                EnhancedComponent = options(Component);
              } else if (typeof options === 'object') {
                if (options.enhanceApp) {
                  EnhancedApp = options.enhanceApp(App);
                }

                if (options.enhanceComponent) {
                  EnhancedComponent = options.enhanceComponent(Component);
                }
              }

              var app = _react["default"].createElement(_loadableCapture["default"], {
                report: function report(moduleName) {
                  return reactLoadableModules.push(moduleName);
                }
              }, _react["default"].createElement(EnhancedApp, (0, _objectSpread2["default"])({
                Component: EnhancedComponent,
                router: router
              }, props)));

              var render = staticMarkup ? _server.renderToStaticMarkup : _server.renderToString;
              var html;
              var head;

              try {
                if (err && dev) {
                  html = render(_react["default"].createElement(_errorDebug["default"], {
                    error: err
                  }));
                } else if (err) {
                  html = render(app);
                } else {
                  html = render(app);
                }
              } finally {
                head = _head["default"].rewind() || (0, _head.defaultHead)();
              }

              return {
                html: html,
                head: head,
                buildManifest: buildManifest
              };
            };

            _context3.next = 34;
            return _loadable["default"].preloadAll();

          case 34:
            _context3.next = 36;
            return (0, _utils.loadGetInitialProps)(Document, (0, _objectSpread2["default"])({}, ctx, {
              renderPage: renderPage
            }));

          case 36:
            docProps = _context3.sent;
            dynamicImports = [].concat(new _set["default"](getDynamicImportBundles(reactLoadableManifest, reactLoadableModules)));
            dynamicImportsIds = dynamicImports.map(function (bundle) {
              return bundle.id;
            });

            if (!(0, _utils.isResSent)(res)) {
              _context3.next = 41;
              break;
            }

            return _context3.abrupt("return");

          case 41:
            if (!(!Document.prototype || !Document.prototype.isReactComponent)) {
              _context3.next = 43;
              break;
            }

            throw new Error('_document.js is not exporting a React component');

          case 43:
            doc = _react["default"].createElement(Document, (0, _objectSpread2["default"])({
              __NEXT_DATA__: {
                props: props,
                // The result of getInitialProps
                page: page,
                // The rendered page
                pathname: pathname,
                // The requested path
                query: query,
                // querystring parsed / passed by the user
                buildId: buildId,
                // buildId is used to facilitate caching of page bundles, we send it to the client so that pageloader knows where to load bundles
                assetPrefix: assetPrefix === '' ? undefined : assetPrefix,
                // send assetPrefix to the client side when configured, otherwise don't sent in the resulting HTML
                runtimeConfig: runtimeConfig,
                // runtimeConfig if provided, otherwise don't sent in the resulting HTML
                nextExport: nextExport,
                // If this is a page exported by `next export`
                dynamicIds: dynamicImportsIds.length === 0 ? undefined : dynamicImportsIds,
                err: err ? serializeError(dev, err) : undefined // Error if one happened, otherwise don't sent in the resulting HTML

              },
              dev: dev,
              dir: dir,
              staticMarkup: staticMarkup,
              buildManifest: buildManifest,
              devFiles: devFiles,
              files: files,
              dynamicImports: dynamicImports,
              assetPrefix: assetPrefix
            }, docProps));
            return _context3.abrupt("return", '<!DOCTYPE html>' + (0, _server.renderToStaticMarkup)(doc));

          case 45:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _doRender.apply(this, arguments);
}

function renderScriptError(_x17, _x18, _x19, _x20) {
  return _renderScriptError.apply(this, arguments);
}

function _renderScriptError() {
  _renderScriptError = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res, page, error) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // Asks CDNs and others to not to cache the errored page
            res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');

            if (!(error.code === 'ENOENT' || error.message === 'INVALID_BUILD_ID')) {
              _context4.next = 5;
              break;
            }

            res.statusCode = 404;
            res.end('404 - Not Found');
            return _context4.abrupt("return");

          case 5:
            logger.error(error.stack);
            res.statusCode = 500;
            res.end('500 - Internal Error');

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _renderScriptError.apply(this, arguments);
}

function sendHTML(req, res, html, method, _ref) {
  var dev = _ref.dev,
      generateEtags = _ref.generateEtags;
  if ((0, _utils.isResSent)(res)) return;
  var etag = generateEtags && (0, _etag["default"])(html);

  if ((0, _fresh["default"])(req.headers, {
    etag: etag
  })) {
    res.statusCode = 304;
    res.end();
    return;
  }

  if (dev) {
    // In dev, we should not cache pages for any reason.
    // That's why we do this.
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
  }

  if (etag) {
    res.setHeader('ETag', etag);
  }

  if (!res.getHeader('Content-Type')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
  }

  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(method === 'HEAD' ? null : html);
}

function errorToJSON(err) {
  var name = err.name,
      message = err.message,
      stack = err.stack;
  var json = {
    name: name,
    message: message,
    stack: stack
  };

  if (err.module) {
    // rawRequest contains the filename of the module which has the error.
    var rawRequest = err.module.rawRequest;
    json.module = {
      rawRequest: rawRequest
    };
  }

  return json;
}

function serializeError(dev, err) {
  if (dev) {
    return errorToJSON(err);
  }

  return {
    message: '500 - Internal Server Error.'
  };
}

function serveStatic(req, res, path) {
  return new _promise["default"](function (resolve, reject) {
    (0, _send["default"])(req, path).on('directory', function () {
      // We don't allow directories to be read.
      var err = new Error('No directory access');
      err.code = 'ENOENT';
      reject(err);
    }).on('error', reject).pipe(res).on('finish', resolve);
  });
}