'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CombineAssetsPlugin = function () {
  function CombineAssetsPlugin(_ref) {
    var input = _ref.input,
        output = _ref.output;
    (0, _classCallCheck3['default'])(this, CombineAssetsPlugin);

    this.input = input;
    this.output = output;
  }

  CombineAssetsPlugin.prototype.apply = function apply(compiler) {
    var _this = this;

    compiler.plugin('after-compile', function (compilation, callback) {
      var newSource = '';
      _this.input.forEach(function (name) {
        var asset = compilation.assets[name];
        if (!asset) return;

        newSource += asset.source() + '\n';
      });

      compilation.assets[_this.output] = {
        source: function source() {
          return newSource;
        },
        size: function size() {
          return newSource.length;
        }
      };

      callback();
    });
  };

  return CombineAssetsPlugin;
}();

exports['default'] = CombineAssetsPlugin;