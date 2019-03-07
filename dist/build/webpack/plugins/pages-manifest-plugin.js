"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _isArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _webpackSources = require("webpack-sources");

var _constants = require("../../../lib/constants");

// This plugin creates a pages-manifest.json from page entrypoints.
// This is used for mapping paths like `/` to `.next/server/static/<buildid>/pages/index.js` when doing SSR
// It's also used by next export to provide defaultPathMap
var PagesManifestPlugin =
/*#__PURE__*/
function () {
  function PagesManifestPlugin() {}

  var _proto = PagesManifestPlugin.prototype;

  _proto.apply = function apply(compiler) {
    compiler.hooks.emit.tap('NextJsPagesManifest', function (compilation) {
      var entries = compilation.entries;
      var pages = {};

      for (var _iterator = entries, _isArray = (0, _isArray2["default"])(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator2["default"])(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var entry = _ref;

        var result = _constants.ROUTE_NAME_REGEX.exec(entry.name);

        if (!result) {
          continue;
        }

        var pagePath = result[1];

        if (!pagePath) {
          continue;
        }

        var name = entry.name;
        pages["/" + pagePath.replace(/\\/g, '/')] = name;
      }

      if (typeof pages['/index'] !== 'undefined') {
        pages['/'] = pages['/index'];
      }

      compilation.assets[_constants.PAGES_MANIFEST] = new _webpackSources.RawSource((0, _stringify["default"])(pages));
    });
  };

  return PagesManifestPlugin;
}();

exports["default"] = PagesManifestPlugin;