"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getPages = getPages;
exports.getPagePaths = getPagePaths;
exports.createEntry = createEntry;
exports.getPageEntries = getPageEntries;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _isArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _promisify = _interopRequireDefault(require("../../lib/promisify"));

var _glob = _interopRequireDefault(require("glob"));

var _constants = require("../../lib/constants");

var glob = (0, _promisify["default"])(_glob["default"]);

function getPages(_x, _x2) {
  return _getPages.apply(this, arguments);
}

function _getPages() {
  _getPages = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(dir, _ref) {
    var nextPagesDir, dev, buildId, isServer, pageExtensions, pageFiles;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nextPagesDir = _ref.nextPagesDir, dev = _ref.dev, buildId = _ref.buildId, isServer = _ref.isServer, pageExtensions = _ref.pageExtensions;
            _context.next = 3;
            return getPagePaths(dir, {
              dev: dev,
              isServer: isServer,
              pageExtensions: pageExtensions
            });

          case 3:
            pageFiles = _context.sent;
            return _context.abrupt("return", getPageEntries(pageFiles, {
              nextPagesDir: nextPagesDir,
              buildId: buildId,
              isServer: isServer,
              pageExtensions: pageExtensions
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPages.apply(this, arguments);
}

function getPagePaths(_x3, _x4) {
  return _getPagePaths.apply(this, arguments);
} // Convert page path into single entry


function _getPagePaths() {
  _getPagePaths = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(dir, _ref2) {
    var dev, isServer, pageExtensions, pages;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dev = _ref2.dev, isServer = _ref2.isServer, pageExtensions = _ref2.pageExtensions;

            if (!dev) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return glob(isServer ? "pages/+(_document|_app|_error).+(" + pageExtensions + ")" : "pages/+(_app|_error).+(" + pageExtensions + ")", {
              cwd: dir
            });

          case 4:
            pages = _context2.sent;
            _context2.next = 10;
            break;

          case 7:
            _context2.next = 9;
            return glob(isServer ? "pages/**/*.+(" + pageExtensions + ")" : "pages/**/!(_document)*.+(" + pageExtensions + ")", {
              cwd: dir
            });

          case 9:
            pages = _context2.sent;

          case 10:
            return _context2.abrupt("return", pages);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getPagePaths.apply(this, arguments);
}

function createEntry(filePath, _temp) {
  var _ref3 = _temp === void 0 ? {} : _temp,
      _ref3$buildId = _ref3.buildId,
      buildId = _ref3$buildId === void 0 ? '' : _ref3$buildId,
      name = _ref3.name,
      pageExtensions = _ref3.pageExtensions;

  var parsedPath = _path["default"].parse(filePath);

  var entryName = name || filePath; // This makes sure we compile `pages/blog/index.js` to `pages/blog.js`.
  // Excludes `pages/index.js` from this rule since we do want `/` to route to `pages/index.js`

  if (parsedPath.dir !== 'pages' && parsedPath.name === 'index') {
    entryName = parsedPath.dir + ".js";
  } // Makes sure supported extensions are stripped off. The outputted file should always be `.js`


  if (pageExtensions) {
    entryName = entryName.replace(new RegExp("\\.+(" + pageExtensions + ")$"), '.js');
  }

  return {
    name: _path["default"].join(_constants.CLIENT_STATIC_FILES_PATH, buildId, entryName),
    files: [parsedPath.root ? filePath : "./" + filePath] // The entry always has to be an array.

  };
} // Convert page paths into entries


function getPageEntries(pagePaths, _temp2) {
  var _ref4 = _temp2 === void 0 ? {} : _temp2,
      nextPagesDir = _ref4.nextPagesDir,
      buildId = _ref4.buildId,
      _ref4$isServer = _ref4.isServer,
      isServer = _ref4$isServer === void 0 ? false : _ref4$isServer,
      pageExtensions = _ref4.pageExtensions;

  var entries = {};

  for (var _iterator = pagePaths, _isArray = (0, _isArray2["default"])(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator2["default"])(_iterator);;) {
    var _ref5;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref5 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref5 = _i.value;
    }

    var filePath = _ref5;
    var entry = createEntry(filePath, {
      pageExtensions: pageExtensions,
      buildId: buildId
    });
    entries[entry.name] = entry.files;
  }

  var appPagePath = _path["default"].join(nextPagesDir, '_app.js');

  var appPageEntry = createEntry(appPagePath, {
    buildId: buildId,
    name: 'pages/_app.js'
  }); // default app.js

  if (!entries[appPageEntry.name]) {
    entries[appPageEntry.name] = appPageEntry.files;
  }

  var errorPagePath = _path["default"].join(nextPagesDir, '_error.js');

  var errorPageEntry = createEntry(errorPagePath, {
    buildId: buildId,
    name: 'pages/_error.js'
  }); // default error.js

  if (!entries[errorPageEntry.name]) {
    entries[errorPageEntry.name] = errorPageEntry.files;
  }

  if (isServer) {
    var documentPagePath = _path["default"].join(nextPagesDir, '_document.js');

    var documentPageEntry = createEntry(documentPagePath, {
      buildId: buildId,
      name: 'pages/_document.js'
    }); // default _document.js

    if (!entries[documentPageEntry.name]) {
      entries[documentPageEntry.name] = documentPageEntry.files;
    }
  }

  return entries;
}