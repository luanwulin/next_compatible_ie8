'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports['default'] = getResourceMap;

var _findUp = require('find-up');

var _findUp2 = _interopRequireDefault(_findUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var cache = new _map2['default']();

function getResourceMap(dir, dev) {
  if (dev) {
    return loadResourceMap(dir);
  } else if (!cache.has(dir + 'resource')) {
    cache.set(dir + 'resource', loadResourceMap(dir));
  }
  return cache.get(dir + 'resource');
}

function loadResourceMap(dir) {
  var path = _findUp2['default'].sync('resource/resource.map.json', {
    cwd: dir
  });

  var resourceMap = {};

  if (path && path.length) {
    var resourceMapModule = require(path);
    resourceMap = resourceMapModule['default'] || resourceMapModule;
  }

  return resourceMap;
}