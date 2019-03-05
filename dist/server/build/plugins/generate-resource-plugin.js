'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _path = require('path');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GernerateResource = function () {
  function GernerateResource() {
    (0, _classCallCheck3['default'])(this, GernerateResource);
  }

  GernerateResource.prototype.apply = function apply(compiler) {
    // 数据处理 用于生成 webpackMap
    compiler.plugin('emit', function (compilation) {
      var pages = compilation.chunks.filter(function (chunk) {
        return _utils.IS_BUNDLED_PAGE.test(chunk.name);
      });

      var webpackMap = {};
      var destPath = compilation.options.output.path;
      var destResourcePath = (0, _path.join)(destPath, 'resource');

      pages.forEach(function (chunk) {
        var name = chunk.name;

        // 如果入口路径不包含 / 则不输出 例如 入口  name == 'project'
        if (name.indexOf('/') < 0) {
          return;
        }

        // 页面名
        var rule = /^bundles[/\\]pages[/\\].*[/\\]index\.js$/;
        if (rule.test(name)) {
          name = name.replace(/[/\\]index\.js$/, '.js');
        }

        var pageName = name.replace(/bundles[/\\]pages[/\\](.*)[/\\]?\.js/, '$1');

        webpackMap[pageName] = {};
        webpackMap[pageName].js = [];
        webpackMap[pageName].css = [];

        // 页面级别资源 (映射) 处理
        [].concat(chunk.files).forEach(mapAsset);

        /**
         * 根据资源类型，将其映射(map)到对应的数组中
         * @param assetsPath  资源路径
         */
        function mapAsset(assetsPath) {
          if (assetsPath) {
            if ((0, _path.extname)(assetsPath) === '.js') {
              // 绝对路径 = publicPath +  assetsPath
              webpackMap[pageName].js.push(assetsPath);
            } else if ((0, _path.extname)(assetsPath) === '.css') {
              webpackMap[pageName].css.push(assetsPath);
            }
          }
        }

        var newContent = (0, _stringify2['default'])(webpackMap);
        // Replace the exisiting chunk with the new content
        compilation.assets[(0, _path.join)(destResourcePath, 'resource.map.json')] = {
          source: function source() {
            return newContent;
          },
          size: function size() {
            return newContent.length;
          }
        };
      });
    });
  };

  return GernerateResource;
}();

exports['default'] = GernerateResource;