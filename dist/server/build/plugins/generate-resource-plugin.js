'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GernerateResource = function () {
  function GernerateResource() {
    (0, _classCallCheck3.default)(this, GernerateResource);
  }

  (0, _createClass3.default)(GernerateResource, [{
    key: 'apply',
    value: function apply(compiler) {
      // 数据处理 用于生成 webpackMap
      compiler.plugin('after-compile', function (compilation, callback) {
        var pages = compilation.chunks.filter(function (chunk) {
          return _utils.IS_BUNDLED_PAGE.test(chunk.name);
        });

        var webpackMap = {};
        var destPath = compilation.options.output.path;
        var destResourcePath = (0, _path.join)(destPath, 'resource');

        pages.forEach(function (chunk) {
          var pageName = _utils.MATCH_ROUTE_NAME.exec(chunk.name)[1];

          // We need to convert \ into / when we are in windows
          // to get the proper route name
          // Here we need to do windows check because it's possible
          // to have "\" in the filename in unix.
          // Anyway if someone did that, he'll be having issues here.
          // But that's something we cannot avoid.
          if (/^win/.test(process.platform)) {
            pageName = pageName.replace(/\\/g, '/');
          }

          pageName = pageName.replace(/(^|\/)index$/, '');

          if (!pageName) {
            return;
          }

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

          var newContent = (0, _stringify2.default)(webpackMap);
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

        callback();
      });
    }
  }]);
  return GernerateResource;
}();

exports.default = GernerateResource;