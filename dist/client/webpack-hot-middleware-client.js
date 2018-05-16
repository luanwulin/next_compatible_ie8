'use strict';

exports.__esModule = true;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _webpackHmr = require('webpack-hot-middleware/client?overlay=false&reload=true&path=/_next/webpack-hmr');

var _webpackHmr2 = _interopRequireDefault(_webpackHmr);

var _router = require('../lib/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var handlers = {
    reload: function reload(route) {
      if (route === '/_error') {
        for (var _iterator = (0, _keys2.default)(_router2.default.components), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var r = _ref;
          var err = _router2.default.components[r].err;

          if (err) {
            _router2.default.reload(r);
          }
        }
        return;
      }

      if (route === '/_document') {
        window.location.reload();
        return;
      }

      _router2.default.reload(route);
    },
    change: function change(route) {
      if (route === '/_document') {
        window.location.reload();
        return;
      }

      var _ref2 = _router2.default.components[route] || {},
          err = _ref2.err,
          Component = _ref2.Component;

      if (err) {
        _router2.default.reload(route);
      }

      if (_router2.default.route !== route) {
        return;
      }

      if (!Component) {
        console.log('Hard reloading due to no default component in page: ' + route);
        window.location.reload();
      }
    }
  };

  _webpackHmr2.default.subscribe(function (obj) {
    var fn = handlers[obj.action];
    if (fn) {
      var data = obj.data || [];
      fn.apply(undefined, data);
    } else {
      throw new Error('Unexpected action ' + obj.action);
    }
  });
};