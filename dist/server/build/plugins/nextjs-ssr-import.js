'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// This plugin modifies the require-ensure code generated by Webpack
// to work with Next.js SSR
var NextJsSsrImportPlugin = function () {
  function NextJsSsrImportPlugin(_ref) {
    var dir = _ref.dir,
        dist = _ref.dist;
    (0, _classCallCheck3['default'])(this, NextJsSsrImportPlugin);

    this.dir = dir;
    this.dist = dist;
  }

  NextJsSsrImportPlugin.prototype.apply = function apply(compiler) {
    var _this = this;

    compiler.plugin('compilation', function (compilation) {
      compilation.mainTemplate.plugin('require-ensure', function (code) {
        // Update to load chunks from our custom chunks directory
        var chunksDirPath = (0, _path.join)(_this.dir, _this.dist, 'dist');
        // Make sure even in windows, the path looks like in unix
        // Node.js require system will convert it accordingly
        var chunksDirPathNormalized = chunksDirPath.replace(/\\/g, '/');
        var updatedCode = code.replace('require("./"', 'require("' + chunksDirPathNormalized + '/"');

        // Replace a promise equivalent which runs in the same loop
        // If we didn't do this webpack's module loading process block us from
        // doing SSR for chunks
        updatedCode = updatedCode.replace('return Promise.resolve();', 'return require(\'next/dynamic\').SameLoopPromise.resolve();');
        return updatedCode;
      });
    });
  };

  return NextJsSsrImportPlugin;
}();

exports['default'] = NextJsSsrImportPlugin;