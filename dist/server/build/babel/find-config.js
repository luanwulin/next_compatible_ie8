'use strict';

exports.__esModule = true;
exports.default = findBabelConfig;

var _path = require('path');

var _buildConfigChain = require('babel-core/lib/transformation/file/options/build-config-chain');

var _buildConfigChain2 = _interopRequireDefault(_buildConfigChain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findBabelConfig(dir) {
  var filename = (0, _path.join)(dir, 'filename.js');
  var options = { babelrc: true, filename: filename };

  var configList = (0, _buildConfigChain2.default)(options).filter(function (i) {
    return i.loc !== 'base';
  });

  return configList[0];
}