'use strict';

<<<<<<< HEAD
exports.__esModule = true;
=======
Object.defineProperty(exports, "__esModule", {
  value: true
});
>>>>>>> parent of b9f85a6... 又兼容了一把

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

<<<<<<< HEAD
=======
var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

>>>>>>> parent of b9f85a6... 又兼容了一把
var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PagesPlugin = function () {
  function PagesPlugin() {
    (0, _classCallCheck3.default)(this, PagesPlugin);
  }

<<<<<<< HEAD
  PagesPlugin.prototype.apply = function apply(compiler) {
    compiler.plugin('after-compile', function (compilation, callback) {
      var pages = (0, _keys2.default)(compilation.namedChunks).map(function (key) {
        return compilation.namedChunks[key];
      }).filter(function (chunk) {
        return _utils.IS_BUNDLED_PAGE.test(chunk.name);
      });

      pages.forEach(function (chunk) {
        var page = compilation.assets[chunk.name];
        var pageName = _utils.MATCH_ROUTE_NAME.exec(chunk.name)[1];
        var routeName = pageName;

        // We need to convert \ into / when we are in windows
        // to get the proper route name
        // Here we need to do windows check because it's possible
        // to have "\" in the filename in unix.
        // Anyway if someone did that, he'll be having issues here.
        // But that's something we cannot avoid.
        if (/^win/.test(process.platform)) {
          routeName = routeName.replace(/\\/g, '/');
        }

        routeName = '/' + routeName.replace(/(^|\/)index$/, '');

        // If there's file named pageDir/index.js
        // We are going to rewrite it as pageDir.js
        // With this, we can statically decide the filepath of the page
        // based on the page name.
        var rule = /^bundles[/\\]pages[/\\].*[/\\]index\.js$/;
        if (rule.test(chunk.name)) {
          delete compilation.assets[chunk.name];
          chunk.name = chunk.name.replace(/[/\\]index\.js$/, '.js');
        }

        var content = page.source();
        var newContent = '\n          window.__NEXT_REGISTER_PAGE(\'' + routeName + '\', function() {\n            var comp = ' + content + '\n            return { page: comp.default }\n          });\n        ';
        // Replace the exisiting chunk with the new content
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

=======
  (0, _createClass3.default)(PagesPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      compiler.plugin('after-compile', function (compilation, callback) {
        var pages = (0, _keys2.default)(compilation.namedChunks).map(function (key) {
          return compilation.namedChunks[key];
        }).filter(function (chunk) {
          return _utils.IS_BUNDLED_PAGE.test(chunk.name);
        });

        pages.forEach(function (chunk) {
          var page = compilation.assets[chunk.name];
          var pageName = _utils.MATCH_ROUTE_NAME.exec(chunk.name)[1];
          var routeName = pageName;

          // We need to convert \ into / when we are in windows
          // to get the proper route name
          // Here we need to do windows check because it's possible
          // to have "\" in the filename in unix.
          // Anyway if someone did that, he'll be having issues here.
          // But that's something we cannot avoid.
          if (/^win/.test(process.platform)) {
            routeName = routeName.replace(/\\/g, '/');
          }

          routeName = '/' + routeName.replace(/(^|\/)index$/, '');

          // If there's file named pageDir/index.js
          // We are going to rewrite it as pageDir.js
          // With this, we can statically decide the filepath of the page
          // based on the page name.
          var rule = /^bundles[/\\]pages[/\\].*[/\\]index\.js$/;
          if (rule.test(chunk.name)) {
            delete compilation.assets[chunk.name];
            chunk.name = chunk.name.replace(/[/\\]index\.js$/, '.js');
          }

          var content = page.source();
          var newContent = '\n          window.__NEXT_REGISTER_PAGE(\'' + routeName + '\', function() {\n            var comp = ' + content + '\n            return { page: comp.default }\n          });\n        ';
          // Replace the exisiting chunk with the new content
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
    }
  }]);
>>>>>>> parent of b9f85a6... 又兼容了一把
  return PagesPlugin;
}();

exports.default = PagesPlugin;