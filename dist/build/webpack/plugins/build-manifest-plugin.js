"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _isArray4 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _webpackSources = require("webpack-sources");

var _constants = require("../../../lib/constants");

// This plugin creates a build-manifest.json for all assets that are being output
// It has a mapping of "entry" filename to real filename. Because the real filename can be hashed in production
var BuildManifestPlugin =
/*#__PURE__*/
function () {
  function BuildManifestPlugin() {}

  var _proto = BuildManifestPlugin.prototype;

  _proto.apply = function apply(compiler) {
    compiler.hooks.emit.tapAsync('NextJsBuildManifest', function (compilation, callback) {
      var chunks = compilation.chunks;
      var assetMap = {
        devFiles: [],
        pages: {}
      };
      var mainJsChunk = chunks.find(function (c) {
        return c.name === _constants.CLIENT_STATIC_FILES_RUNTIME_MAIN;
      });
      var mainJsFiles = mainJsChunk && mainJsChunk.files.length > 0 ? mainJsChunk.files.filter(function (file) {
        return /\.js$/.test(file);
      }) : [];

      var _arr = (0, _keys["default"])(compilation.assets);

      for (var _i = 0; _i < _arr.length; _i++) {
        var filePath = _arr[_i];
        var path = filePath.replace(/\\/g, '/');

        if (/^static\/development\/dll\//.test(path)) {
          assetMap.devFiles.push(path);
        }
      } // compilation.entrypoints is a Map object, so iterating over it 0 is the key and 1 is the value


      for (var _iterator = compilation.entrypoints.entries(), _isArray = (0, _isArray4["default"])(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : (0, _getIterator2["default"])(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i2 >= _iterator.length) break;
          _ref = _iterator[_i2++];
        } else {
          _i2 = _iterator.next();
          if (_i2.done) break;
          _ref = _i2.value;
        }

        var _ref2 = _ref,
            entrypoint = _ref2[1];

        var result = _constants.ROUTE_NAME_REGEX.exec(entrypoint.name);

        if (!result) {
          continue;
        }

        var pagePath = result[1];

        if (!pagePath) {
          continue;
        }

        var filesForEntry = [];

        for (var _iterator2 = entrypoint.chunks, _isArray2 = (0, _isArray4["default"])(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator2["default"])(_iterator2);;) {
          var _ref3;

          if (_isArray2) {
            if (_i3 >= _iterator2.length) break;
            _ref3 = _iterator2[_i3++];
          } else {
            _i3 = _iterator2.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var chunk = _ref3;

          // If there's no name or no files
          if (!chunk.name || !chunk.files) {
            continue;
          }

          for (var _iterator3 = chunk.files, _isArray3 = (0, _isArray4["default"])(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator2["default"])(_iterator3);;) {
            var _ref4;

            if (_isArray3) {
              if (_i4 >= _iterator3.length) break;
              _ref4 = _iterator3[_i4++];
            } else {
              _i4 = _iterator3.next();
              if (_i4.done) break;
              _ref4 = _i4.value;
            }

            var file = _ref4;

            if (/\.map$/.test(file) || /\.hot-update\.js$/.test(file)) {
              continue;
            } // Only `.js` and `.css` files are added for now. In the future we can also handle other file types.


            if (!/\.js$/.test(file) && !/\.css$/.test(file)) {
              continue;
            } // The page bundles are manually added to _document.js as they need extra properties


            if (_constants.IS_BUNDLED_PAGE_REGEX.exec(file)) {
              continue;
            }

            filesForEntry.push(file.replace(/\\/g, '/'));
          }
        }

        assetMap.pages["/" + pagePath.replace(/\\/g, '/')] = [].concat(filesForEntry, mainJsFiles);
      }

      if (typeof assetMap.pages['/index'] !== 'undefined') {
        assetMap.pages['/'] = assetMap.pages['/index'];
      }

      compilation.assets[_constants.BUILD_MANIFEST] = new _webpackSources.RawSource((0, _stringify["default"])(assetMap, null, 2));
      callback();
    });
  };

  return BuildManifestPlugin;
}();

exports["default"] = BuildManifestPlugin;