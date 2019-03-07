"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _isArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/map"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
@copyright (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/
// https://github.com/jamiebuilds/react-loadable/blob/v5.5.0/src/index.js
// Modified to be compatible with webpack 4 / Next.js
var ALL_INITIALIZERS = [];
var READY_INITIALIZERS = new _map["default"]();
var initialized = false;

function load(loader) {
  var promise = loader();
  var state = {
    loading: true,
    loaded: null,
    error: null
  };
  state.promise = promise.then(function (loaded) {
    state.loading = false;
    state.loaded = loaded;
    return loaded;
  })["catch"](function (err) {
    state.loading = false;
    state.error = err;
    throw err;
  });
  return state;
}

function loadMap(obj) {
  var state = {
    loading: false,
    loaded: {},
    error: null
  };
  var promises = [];

  try {
    (0, _keys["default"])(obj).forEach(function (key) {
      var result = load(obj[key]);

      if (!result.loading) {
        state.loaded[key] = result.loaded;
        state.error = result.error;
      } else {
        state.loading = true;
      }

      promises.push(result.promise);
      result.promise.then(function (res) {
        state.loaded[key] = res;
      })["catch"](function (err) {
        state.error = err;
      });
    });
  } catch (err) {
    state.error = err;
  }

  state.promise = _promise["default"].all(promises).then(function (res) {
    state.loading = false;
    return res;
  })["catch"](function (err) {
    state.loading = false;
    throw err;
  });
  return state;
}

function resolve(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
}

function render(loaded, props) {
  return _react["default"].createElement(resolve(loaded), props);
}

function createLoadableComponent(loadFn, options) {
  var _class, _temp;

  var opts = (0, _assign["default"])({
    loader: null,
    loading: null,
    delay: 200,
    timeout: null,
    render: render,
    webpack: null,
    modules: null
  }, options);
  var res = null;

  function init() {
    if (!res) {
      res = loadFn(opts.loader);
    }

    return res.promise;
  } // Server only


  if (typeof window === 'undefined') {
    ALL_INITIALIZERS.push(init);
  } // Client only


  if (!initialized && typeof window !== 'undefined' && typeof opts.webpack === 'function') {
    var moduleIds = opts.webpack();

    for (var _iterator = moduleIds, _isArray = (0, _isArray2["default"])(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator2["default"])(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var moduleId = _ref;
      READY_INITIALIZERS.set(moduleId, function () {
        return init();
      });
    }
  }

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2["default"])(LoadableComponent, _React$Component);

    function LoadableComponent(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "retry", function () {
        _this.setState({
          error: null,
          loading: true,
          timedOut: false
        });

        res = loadFn(opts.loader);

        _this._loadModule();
      });
      init();
      _this.state = {
        error: res.error,
        pastDelay: false,
        timedOut: false,
        loading: res.loading,
        loaded: res.loaded
      };
      return _this;
    }

    LoadableComponent.preload = function preload() {
      return init();
    };

    var _proto = LoadableComponent.prototype;

    _proto.componentWillMount = function componentWillMount() {
      this._mounted = true;

      this._loadModule();
    };

    _proto._loadModule = function _loadModule() {
      var _this2 = this;

      if (this.context.loadable && (0, _isArray2["default"])(opts.modules)) {
        opts.modules.forEach(function (moduleName) {
          _this2.context.loadable.report(moduleName);
        });
      }

      if (!res.loading) {
        return;
      }

      if (typeof opts.delay === 'number') {
        if (opts.delay === 0) {
          this.setState({
            pastDelay: true
          });
        } else {
          this._delay = setTimeout(function () {
            _this2.setState({
              pastDelay: true
            });
          }, opts.delay);
        }
      }

      if (typeof opts.timeout === 'number') {
        this._timeout = setTimeout(function () {
          _this2.setState({
            timedOut: true
          });
        }, opts.timeout);
      }

      var update = function update() {
        if (!_this2._mounted) {
          return;
        }

        _this2.setState({
          error: res.error,
          loaded: res.loaded,
          loading: res.loading
        });

        _this2._clearTimeouts();
      };

      res.promise.then(function () {
        update();
      }) // eslint-disable-next-line handle-callback-err
      ["catch"](function (err) {
        update();
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this._mounted = false;

      this._clearTimeouts();
    };

    _proto._clearTimeouts = function _clearTimeouts() {
      clearTimeout(this._delay);
      clearTimeout(this._timeout);
    };

    _proto.render = function render() {
      if (this.state.loading || this.state.error) {
        return _react["default"].createElement(opts.loading, {
          isLoading: this.state.loading,
          pastDelay: this.state.pastDelay,
          timedOut: this.state.timedOut,
          error: this.state.error,
          retry: this.retry
        });
      } else if (this.state.loaded) {
        return opts.render(this.state.loaded, this.props);
      } else {
        return null;
      }
    };

    return LoadableComponent;
  }(_react["default"].Component), (0, _defineProperty2["default"])(_class, "contextTypes", {
    loadable: _propTypes["default"].shape({
      report: _propTypes["default"].func.isRequired
    })
  }), _temp;
}

function Loadable(opts) {
  return createLoadableComponent(load, opts);
}

function LoadableMap(opts) {
  if (typeof opts.render !== 'function') {
    throw new Error('LoadableMap requires a `render(loaded, props)` function');
  }

  return createLoadableComponent(loadMap, opts);
}

Loadable.Map = LoadableMap;

function flushInitializers(initializers) {
  var promises = [];

  while (initializers.length) {
    var init = initializers.pop();
    promises.push(init());
  }

  return _promise["default"].all(promises).then(function () {
    if (initializers.length) {
      return flushInitializers(initializers);
    }
  });
}

Loadable.preloadAll = function () {
  return new _promise["default"](function (resolve, reject) {
    flushInitializers(ALL_INITIALIZERS).then(resolve, reject);
  });
};

Loadable.preloadReady = function (webpackIds) {
  return new _promise["default"](function (resolve, reject) {
    var initializers = webpackIds.reduce(function (allInitalizers, moduleId) {
      var initializer = READY_INITIALIZERS.get(moduleId);

      if (!initializer) {
        return allInitalizers;
      }

      allInitalizers.push(initializer);
      return allInitalizers;
    }, []);
    initialized = true; // Make sure the object is cleared

    READY_INITIALIZERS.clear(); // We always will resolve, errors should be handled within loading UIs.

    flushInitializers(initializers).then(resolve, resolve);
  });
};

module.exports = Loadable;