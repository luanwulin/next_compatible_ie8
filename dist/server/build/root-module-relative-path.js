'use strict';

exports.__esModule = true;

var _path = require('path');

var RELATIVE_START = 'node_modules' + _path.sep;

exports['default'] = function (moduleRequire) {
  return function (path) {
    var absolutePath = moduleRequire.resolve(path).replace(/[\\/]package\.json$/, '');

    var relativeStartIndex = absolutePath.indexOf(RELATIVE_START);

    if (relativeStartIndex === -1) {
      return absolutePath;
    }

    return absolutePath.substring(relativeStartIndex + RELATIVE_START.length);
  };
};

module.exports = exports['default'];