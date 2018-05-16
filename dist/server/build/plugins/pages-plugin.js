'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PagesPlugin = function () {
  function PagesPlugin() {
    (0, _classCallCheck3['default'])(this, PagesPlugin);
  }

  PagesPlugin.prototype.apply = function apply(compiler) {
    compiler.plugin('after-compile', function (compilation, callback) {
      var pages = (0, _keys2['default'])(compilation.namedChunks).map(function (key) {
        return compilation.namedChunks[key];
      }).filter(function (chunk) {
        return _utils.IS_BUNDLED_PAGE.test(chunk.name);
      });

      pages.forEach(function (chunk) {
        var page = compilation.assets[chunk.name];
        var pageName = _utils.MATCH_ROUTE_NAME.exec(chunk.name)[1];
        var routeName = pageName;

        if (/^win/.test(process.platform)) {
          routeName = routeName.replace(/\\/g, '/');
        }

        routeName = '/' + routeName.replace(/(^|\/)index$/, '');

        var rule = /^bundles[/\\]pages[/\\].*[/\\]index\.js$/;
        if (rule.test(chunk.name)) {
          delete compilation.assets[chunk.name];
          chunk.name = chunk.name.replace(/[/\\]index\.js$/, '.js');
        }

        var content = page.source();
        var newContent = '\n          window.__NEXT_REGISTER_PAGE(\'' + routeName + '\', function() {\n            var comp = ' + content + '\n            return { page: comp.default }\n          })\n        ';

        compilation.assets[chunk.name] = {
          source: function source() {
            return newContent;
          },
          size: function size() {
            return newContent.length;
          }
        };
      });
      callback();
    });
  };

  return PagesPlugin;
}();

exports['default'] = PagesPlugin;
module.exports = exports['default'];