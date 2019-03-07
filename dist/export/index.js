"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = _default;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _isArray3 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _del = _interopRequireDefault(require("del"));

var _recursiveCopy = _interopRequireDefault(require("recursive-copy"));

var _mkdirpThen = _interopRequireDefault(require("mkdirp-then"));

var _path = require("path");

var _fs = require("fs");

var _config = _interopRequireDefault(require("../server/config"));

var _constants = require("../lib/constants");

var _render = require("../server/render");

var _asset = require("../lib/asset");

var envConfig = _interopRequireWildcard(require("../lib/runtime-config"));

function _default(_x, _x2, _x3) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(dir, options, configuration) {
    var log, nextConfig, distDir, buildId, pagesManifest, pages, defaultPathMap, _iterator, _isArray, _i, _ref2, page, outDir, renderOpts, serverRuntimeConfig, publicRuntimeConfig, exportPathMap, exportPaths, _iterator2, _isArray2, _i2, _ref4, path, _exportPathMap$path, _page, _exportPathMap$path$q, query, req, res, htmlFilename, baseDir, htmlFilepath, html;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            log = function _ref5(message) {
              if (options.silent) return;
              console.log(message);
            };

            dir = (0, _path.resolve)(dir);
            nextConfig = configuration || (0, _config["default"])(_constants.PHASE_EXPORT, dir);
            distDir = (0, _path.join)(dir, nextConfig.distDir);
            log("> using build directory: " + distDir);

            if ((0, _fs.existsSync)(distDir)) {
              _context2.next = 7;
              break;
            }

            throw new Error("Build directory " + distDir + " does not exist. Make sure you run \"next build\" before running \"next start\" or \"next export\".");

          case 7:
            buildId = (0, _fs.readFileSync)((0, _path.join)(distDir, _constants.BUILD_ID_FILE), 'utf8');
            pagesManifest = require((0, _path.join)(distDir, _constants.SERVER_DIRECTORY, _constants.PAGES_MANIFEST));
            pages = (0, _keys["default"])(pagesManifest);
            defaultPathMap = {};
            _iterator = pages, _isArray = (0, _isArray3["default"])(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator2["default"])(_iterator);

          case 12:
            if (!_isArray) {
              _context2.next = 18;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("break", 31);

          case 15:
            _ref2 = _iterator[_i++];
            _context2.next = 22;
            break;

          case 18:
            _i = _iterator.next();

            if (!_i.done) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt("break", 31);

          case 21:
            _ref2 = _i.value;

          case 22:
            page = _ref2;

            if (!(page === '/_document' || page === '/_app')) {
              _context2.next = 25;
              break;
            }

            return _context2.abrupt("continue", 29);

          case 25:
            if (!(page === '/_error')) {
              _context2.next = 28;
              break;
            }

            defaultPathMap['/404'] = {
              page: page
            };
            return _context2.abrupt("continue", 29);

          case 28:
            defaultPathMap[page] = {
              page: page
            };

          case 29:
            _context2.next = 12;
            break;

          case 31:
            // Initialize the output directory
            outDir = options.outdir;
            _context2.next = 34;
            return (0, _del["default"])((0, _path.join)(outDir, '*'));

          case 34:
            _context2.next = 36;
            return (0, _mkdirpThen["default"])((0, _path.join)(outDir, '_next', buildId));

          case 36:
            if (!(0, _fs.existsSync)((0, _path.join)(dir, 'static'))) {
              _context2.next = 40;
              break;
            }

            log('  copying "static" directory');
            _context2.next = 40;
            return (0, _recursiveCopy["default"])((0, _path.join)(dir, 'static'), (0, _path.join)(outDir, 'static'), {
              expand: true
            });

          case 40:
            if (!(0, _fs.existsSync)((0, _path.join)(distDir, _constants.CLIENT_STATIC_FILES_PATH))) {
              _context2.next = 44;
              break;
            }

            log('  copying "static build" directory');
            _context2.next = 44;
            return (0, _recursiveCopy["default"])((0, _path.join)(distDir, _constants.CLIENT_STATIC_FILES_PATH), (0, _path.join)(outDir, '_next', _constants.CLIENT_STATIC_FILES_PATH));

          case 44:
            // Get the exportPathMap from the config file
            if (typeof nextConfig.exportPathMap !== 'function') {
              console.log("> No \"exportPathMap\" found in \"" + _constants.CONFIG_FILE + "\". Generating map from \"./pages\"");

              nextConfig.exportPathMap =
              /*#__PURE__*/
              function () {
                var _ref3 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee(defaultMap) {
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", defaultMap);

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x4) {
                  return _ref3.apply(this, arguments);
                };
              }();
            } // Start the rendering process


            renderOpts = {
              dir: dir,
              buildId: buildId,
              nextExport: true,
              assetPrefix: nextConfig.assetPrefix.replace(/\/$/, ''),
              distDir: distDir,
              dev: false,
              staticMarkup: false,
              hotReloader: null
            };
            serverRuntimeConfig = nextConfig.serverRuntimeConfig, publicRuntimeConfig = nextConfig.publicRuntimeConfig;

            if (publicRuntimeConfig) {
              renderOpts.runtimeConfig = publicRuntimeConfig;
            }

            envConfig.setConfig({
              serverRuntimeConfig: serverRuntimeConfig,
              publicRuntimeConfig: publicRuntimeConfig
            }); // set the assetPrefix to use for 'next/asset'

            (0, _asset.setAssetPrefix)(renderOpts.assetPrefix); // We need this for server rendering the Link component.

            global.__NEXT_DATA__ = {
              nextExport: true
            };
            _context2.next = 53;
            return nextConfig.exportPathMap(defaultPathMap, {
              dev: false,
              dir: dir,
              outDir: outDir,
              distDir: distDir,
              buildId: buildId
            });

          case 53:
            exportPathMap = _context2.sent;
            exportPaths = (0, _keys["default"])(exportPathMap);
            _iterator2 = exportPaths, _isArray2 = (0, _isArray3["default"])(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator2["default"])(_iterator2);

          case 56:
            if (!_isArray2) {
              _context2.next = 62;
              break;
            }

            if (!(_i2 >= _iterator2.length)) {
              _context2.next = 59;
              break;
            }

            return _context2.abrupt("break", 85);

          case 59:
            _ref4 = _iterator2[_i2++];
            _context2.next = 66;
            break;

          case 62:
            _i2 = _iterator2.next();

            if (!_i2.done) {
              _context2.next = 65;
              break;
            }

            return _context2.abrupt("break", 85);

          case 65:
            _ref4 = _i2.value;

          case 66:
            path = _ref4;
            log("> exporting path: " + path);

            if (path.startsWith('/')) {
              _context2.next = 70;
              break;
            }

            throw new Error("path \"" + path + "\" doesn't start with a backslash");

          case 70:
            _exportPathMap$path = exportPathMap[path], _page = _exportPathMap$path.page, _exportPathMap$path$q = _exportPathMap$path.query, query = _exportPathMap$path$q === void 0 ? {} : _exportPathMap$path$q;
            req = {
              url: path
            };
            res = {};
            htmlFilename = "" + path + _path.sep + "index.html";

            if ((0, _path.extname)(path) !== '') {
              // If the path has an extension, use that as the filename instead
              htmlFilename = path;
            } else if (path === '/') {
              // If the path is the root, just use index.html
              htmlFilename = 'index.html';
            }

            baseDir = (0, _path.join)(outDir, (0, _path.dirname)(htmlFilename));
            htmlFilepath = (0, _path.join)(outDir, htmlFilename);
            _context2.next = 79;
            return (0, _mkdirpThen["default"])(baseDir);

          case 79:
            _context2.next = 81;
            return (0, _render.renderToHTML)(req, res, _page, query, renderOpts);

          case 81:
            html = _context2.sent;
            (0, _fs.writeFileSync)(htmlFilepath, html, 'utf8');

          case 83:
            _context2.next = 56;
            break;

          case 85:
            // Add an empty line to the console for the better readability.
            log('');

          case 86:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _ref.apply(this, arguments);
}