'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WatchPagesPlugin = function () {
  function WatchPagesPlugin(dir) {
    (0, _classCallCheck3.default)(this, WatchPagesPlugin);

    this.dir = (0, _path.resolve)(dir, 'pages');
  }

  WatchPagesPlugin.prototype.apply = function apply(compiler) {
    var _this = this;

    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('optimize-assets', function (assets, callback) {
        delete assets[(0, _path.join)('bundles', 'pages', '_document.js')];
        callback();
      });
    });

    compiler.plugin('emit', function (compilation, callback) {
      compilation.contextDependencies = [].concat(compilation.contextDependencies, [_this.dir]);
      callback();
    });
  };

  return WatchPagesPlugin;
}();

exports.default = WatchPagesPlugin;