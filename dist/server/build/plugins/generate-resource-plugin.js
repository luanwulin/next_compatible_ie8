'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fsExtra = require('fs-extra');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GernerateResource = function () {
    function GernerateResource() {
        (0, _classCallCheck3.default)(this, GernerateResource);
    }

    (0, _createClass3.default)(GernerateResource, [{
        key: 'apply',
        value: function apply(compiler) {
            // 数据处理 用于生成 webpackMap
            compiler.plugin('done', function (map) {
                var webpackMap = {},
                    destPath = map.compilation.options.output.path,
                    destResourcePath = (0, _path.join)(destPath, 'resource');

                // 调用 webpack map toJson 生成 jsonMap
                map = map.toJson();

                (0, _keys2.default)(map.entrypoints).forEach(function (item) {
                    // 如果入口路径不包含 / 则不输出 例如 入口  name == 'project'
                    if (item.indexOf('/') < 0) {
                        return;
                    }

                    // 页面名
                    var rule = /^bundles[/\\]pages[/\\].*[/\\]index\.js$/;
                    if (rule.test(item)) {
                        item = item.replace(/^bundles[/\\]pages[/\\](.*)[/\\]index\.js$/, '$1.js');
                    }

                    var pageName = item;

                    webpackMap[item] = {};
                    webpackMap[item].js = [];
                    webpackMap[item].css = [];

                    // webpack资源 (映射) 处理
                    [].concat(map.assetsByChunkName['manifest']).forEach(mapAsset);

                    // 公共资源 (映射) 处理
                    [].concat(map.assetsByChunkName['common']).forEach(mapAsset);

                    // 项目公共资源 (映射) 处理
                    [].concat(map.assetsByChunkName['main']).forEach(mapAsset);

                    // 页面级别资源 (映射) 处理
                    [].concat(map.assetsByChunkName[item]).forEach(mapAsset);

                    /**
                     * 根据资源类型，将其映射(map)到对应的数组中
                     * @param assetsPath  资源路径
                     */
                    function mapAsset(assetsPath) {
                        if (assetsPath) {
                            if ((0, _path.extname)(assetsPath) === '.js') {
                                // 绝对路径 = publicPath +  assetsPath
                                webpackMap[pageName].js.push(map.publicPath + assetsPath);
                            } else if ((0, _path.extname)(assetsPath) === '.css') {
                                webpackMap[pageName].css.push(map.publicPath + assetsPath);
                            }
                        }
                    }
                });

                (0, _fsExtra.mkdirp)(destResourcePath);

                // webpackMap 写入 config.json
                (0, _fsExtra.writeJsonSync)((0, _path.join)(destResourcePath, 'resource.map.json'), webpackMap);
            });
        }
    }]);
    return GernerateResource;
}();

exports.default = GernerateResource;