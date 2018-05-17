'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _recursiveCopy = require('recursive-copy');

var _recursiveCopy2 = _interopRequireDefault(_recursiveCopy);

var _mkdirpThen = require('mkdirp-then');

var _mkdirpThen2 = _interopRequireDefault(_mkdirpThen);

var _walk = require('walk');

var _walk2 = _interopRequireDefault(_walk);

var _path = require('path');

var _fs = require('fs');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _render = require('./render');

var _utils = require('./utils');

var _utils2 = require('../lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function () {
  var _ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(dir, options, configuration) {
    var config, nextDir, buildId, buildStats, outDir, exportPathMap, exportPaths, renderOpts, _iterator, _isArray, _i, _ref2, path, _exportPathMap$path, page, _exportPathMap$path$q, query, req, res, htmlFilename, baseDir, htmlFilepath, html, log;

    return _regenerator2['default'].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log = function log(message) {
              if (options.silent) return;
              console.log(message);
            };

            dir = (0, _path.resolve)(dir);
            config = configuration || (0, _config2['default'])(dir);
            nextDir = (0, _path.join)(dir, config.distDir);


            log('  using build directory: ' + nextDir);

            if (!(0, _fs.existsSync)(nextDir)) {
              console.error('Build directory ' + nextDir + ' does not exist. Make sure you run "next build" before running "next start" or "next export".');
              process.exit(1);
            }

            buildId = (0, _fs.readFileSync)((0, _path.join)(nextDir, 'BUILD_ID'), 'utf8');
            buildStats = require((0, _path.join)(nextDir, 'build-stats.json'));
            outDir = options.outdir;
            _context.next = 11;
            return (0, _del2['default'])((0, _path.join)(outDir, '*'));

          case 11:
            _context.next = 13;
            return (0, _mkdirpThen2['default'])((0, _path.join)(outDir, '_next', buildStats['app.js'].hash));

          case 13:
            _context.next = 15;
            return (0, _mkdirpThen2['default'])((0, _path.join)(outDir, '_next', buildId));

          case 15:
            _context.next = 17;
            return (0, _recursiveCopy2['default'])((0, _path.join)(nextDir, 'app.js'), (0, _path.join)(outDir, '_next', buildStats['app.js'].hash, 'app.js'));

          case 17:
            if (!(0, _fs.existsSync)((0, _path.join)(dir, 'static'))) {
              _context.next = 21;
              break;
            }

            log('  copying "static" directory');
            _context.next = 21;
            return (0, _recursiveCopy2['default'])((0, _path.join)(dir, 'static'), (0, _path.join)(outDir, 'static'));

          case 21:
            if (!(0, _fs.existsSync)((0, _path.join)(nextDir, 'chunks'))) {
              _context.next = 27;
              break;
            }

            log('  copying dynamic import chunks');

            _context.next = 25;
            return (0, _mkdirpThen2['default'])((0, _path.join)(outDir, '_next', buildId, 'webpack'));

          case 25:
            _context.next = 27;
            return (0, _recursiveCopy2['default'])((0, _path.join)(nextDir, 'chunks'), (0, _path.join)(outDir, '_next', buildId, 'webpack', 'chunks'));

          case 27:
            _context.next = 29;
            return copyPages(nextDir, outDir, buildId);

          case 29:
            if (typeof config.exportPathMap !== 'function') {
              (0, _utils2.printAndExit)('> Could not find "exportPathMap" function inside "next.config.js"\n' + '> "next export" uses that function to build html pages.');
            }

            _context.next = 32;
            return config.exportPathMap();

          case 32:
            exportPathMap = _context.sent;
            exportPaths = (0, _keys2['default'])(exportPathMap);
            renderOpts = {
              dir: dir,
              buildStats: buildStats,
              buildId: buildId,
              nextExport: true,
              assetPrefix: config.assetPrefix.replace(/\/$/, ''),
              dev: false,
              staticMarkup: false,
              hotReloader: null,
              availableChunks: (0, _utils.getAvailableChunks)(dir, config.distDir)
            };

            global.__NEXT_DATA__ = {
              nextExport: true
            };

            _iterator = exportPaths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3['default'])(_iterator);

          case 37:
            if (!_isArray) {
              _context.next = 43;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 40;
              break;
            }

            return _context.abrupt('break', 64);

          case 40:
            _ref2 = _iterator[_i++];
            _context.next = 47;
            break;

          case 43:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 46;
              break;
            }

            return _context.abrupt('break', 64);

          case 46:
            _ref2 = _i.value;

          case 47:
            path = _ref2;

            log('  exporting path: ' + path);

            _exportPathMap$path = exportPathMap[path], page = _exportPathMap$path.page, _exportPathMap$path$q = _exportPathMap$path.query, query = _exportPathMap$path$q === undefined ? {} : _exportPathMap$path$q;
            req = { url: path };
            res = {};
            htmlFilename = '' + path + _path.sep + 'index.html';

            if ((0, _path.extname)(path) !== '') {
              htmlFilename = path;
            } else if (path === '/') {
              htmlFilename = 'index.html';
            }
            baseDir = (0, _path.join)(outDir, (0, _path.dirname)(htmlFilename));
            htmlFilepath = (0, _path.join)(outDir, htmlFilename);
            _context.next = 58;
            return (0, _mkdirpThen2['default'])(baseDir);

          case 58:
            _context.next = 60;
            return (0, _render.renderToHTML)(req, res, page, query, renderOpts);

          case 60:
            html = _context.sent;

            (0, _fs.writeFileSync)(htmlFilepath, html, 'utf8');

          case 62:
            _context.next = 37;
            break;

          case 64:
            log('');

          case 65:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function copyPages(nextDir, outDir, buildId) {
  return new _promise2['default'](function (resolve, reject) {
    var nextBundlesDir = (0, _path.join)(nextDir, 'bundles', 'pages');
    var walker = _walk2['default'].walk(nextBundlesDir, { followLinks: false });

    walker.on('file', function (root, stat, next) {
      var filename = stat.name;
      var fullFilePath = '' + root + _path.sep + filename;
      var relativeFilePath = fullFilePath.replace(nextBundlesDir, '');

      if (relativeFilePath === '/_document.js') {
        next();
        return;
      }

      var destFilePath = null;
      if (relativeFilePath === _path.sep + 'index.js') {
        destFilePath = (0, _path.join)(outDir, '_next', buildId, 'page', relativeFilePath);
      } else if (/index\.js$/.test(filename)) {
        var newRelativeFilePath = relativeFilePath.replace(_path.sep + 'index.js', '.js');
        destFilePath = (0, _path.join)(outDir, '_next', buildId, 'page', newRelativeFilePath);
      } else {
        destFilePath = (0, _path.join)(outDir, '_next', buildId, 'page', relativeFilePath);
      }

      (0, _recursiveCopy2['default'])(fullFilePath, destFilePath).then(next)['catch'](reject);
    });

    walker.on('end', resolve);
  });
}