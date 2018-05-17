'use strict';

exports.__esModule = true;

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var isFile = function () {
  var _ref4 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee2(p) {
    var stat, realpath;
    return _regenerator2['default'].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            stat = void 0;
            _context2.prev = 1;
            _context2.next = 4;
            return _fs2['default'].stat(p);

          case 4:
            stat = _context2.sent;
            _context2.next = 12;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](1);

            if (!(_context2.t0.code === 'ENOENT')) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt('return', false);

          case 11:
            throw _context2.t0;

          case 12:
            _context2.next = 14;
            return getTrueFilePath(p);

          case 14:
            realpath = _context2.sent;

            if (!(p !== realpath)) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt('return', false);

          case 17:
            return _context2.abrupt('return', stat.isFile() || stat.isFIFO());

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 7]]);
  }));

  return function isFile(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var getTrueFilePath = function () {
  var _ref5 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee3(p) {
    var fsPathNormalized, pathRoot, noDrivePath, result;
    return _regenerator2['default'].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fsPathNormalized = p;

            if (process.platform === 'darwin') fsPathNormalized = fsPathNormalized.normalize('NFD');

            pathRoot = (0, _path.parse)(fsPathNormalized).root;
            noDrivePath = fsPathNormalized.slice(Math.max(pathRoot.length - 1, 0));
            _context3.next = 6;
            return (0, _globPromise2['default'])(noDrivePath, { nocase: true, cwd: pathRoot });

          case 6:
            result = _context3.sent;
            return _context3.abrupt('return', result[0]);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getTrueFilePath(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.resolveFromList = resolveFromList;

var _path = require('path');

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function () {
  var _ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(id) {
    var paths, _iterator, _isArray, _i, _ref2, p, err;

    return _regenerator2['default'].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            paths = getPaths(id);
            _iterator = paths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3['default'])(_iterator);

          case 2:
            if (!_isArray) {
              _context.next = 8;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('break', 19);

          case 5:
            _ref2 = _iterator[_i++];
            _context.next = 12;
            break;

          case 8:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('break', 19);

          case 11:
            _ref2 = _i.value;

          case 12:
            p = _ref2;
            _context.next = 15;
            return isFile(p);

          case 15:
            if (!_context.sent) {
              _context.next = 17;
              break;
            }

            return _context.abrupt('return', p);

          case 17:
            _context.next = 2;
            break;

          case 19:
            err = new Error('Cannot find module ' + id);

            err.code = 'ENOENT';
            throw err;

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function resolve(_x) {
    return _ref.apply(this, arguments);
  }

  return resolve;
}();

function resolveFromList(id, files) {
  var paths = getPaths(id);
  var set = new _set2['default'](files);
  for (var _iterator2 = paths, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3['default'])(_iterator2);;) {
    var _ref3;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref3 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref3 = _i2.value;
    }

    var p = _ref3;

    if (set.has(p)) return p;
  }
}

function getPaths(id) {
  var i = _path.sep === '/' ? id : id.replace(/\//g, _path.sep);

  if (i.slice(-3) === '.js') return [i];
  if (i.slice(-5) === '.json') return [i];

  if (i[i.length - 1] === _path.sep) {
    return [i + 'index.js', i + 'index.json'];
  }

  return [i + '.js', (0, _path.join)(i, 'index.js'), i + '.json', (0, _path.join)(i, 'index.json')];
}