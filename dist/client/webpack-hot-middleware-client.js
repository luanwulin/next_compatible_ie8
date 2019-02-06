'use strict';

<<<<<<< HEAD
exports.__esModule = true;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);
=======
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
>>>>>>> parent of b9f85a6... 又兼容了一把

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

<<<<<<< HEAD
=======
var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

>>>>>>> parent of b9f85a6... 又兼容了一把
var _webpackHmr = require('webpack-hot-middleware/client?overlay=false&reload=true&path=/_next/webpack-hmr');

var _webpackHmr2 = _interopRequireDefault(_webpackHmr);

var _router = require('../lib/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var handlers = {
    reload: function reload(route) {
      if (route === '/_error') {
<<<<<<< HEAD
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
            // reload all error routes
            // which are expected to be errors of '/_error' routes
            _router2.default.reload(r);
          }
        }
=======
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(_router2.default.components)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var r = _step.value;
            var err = _router2.default.components[r].err;

            if (err) {
              // reload all error routes
              // which are expected to be errors of '/_error' routes
              _router2.default.reload(r);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

>>>>>>> parent of b9f85a6... 又兼容了一把
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

<<<<<<< HEAD
      var _ref2 = _router2.default.components[route] || {},
          err = _ref2.err,
          Component = _ref2.Component;
=======
      var _ref = _router2.default.components[route] || {},
          err = _ref.err,
          Component = _ref.Component;
>>>>>>> parent of b9f85a6... 又兼容了一把

      if (err) {
        // reload to recover from runtime errors
        _router2.default.reload(route);
      }

      if (_router2.default.route !== route) {
        // If this is a not a change for a currently viewing page.
        // We don't need to worry about it.
        return;
      }

      if (!Component) {
        // This only happens when we create a new page without a default export.
        // If you removed a default export from a exising viewing page, this has no effect.
        console.log('Hard reloading due to no default component in page: ' + route);
        window.location.reload();
      }
    }
  };

  _webpackHmr2.default.subscribe(function (obj) {
    var fn = handlers[obj.action];
    if (fn) {
      var data = obj.data || [];
<<<<<<< HEAD
      fn.apply(undefined, data);
=======
      fn.apply(undefined, (0, _toConsumableArray3.default)(data));
>>>>>>> parent of b9f85a6... 又兼容了一把
    } else {
      throw new Error('Unexpected action ' + obj.action);
    }
  });
};