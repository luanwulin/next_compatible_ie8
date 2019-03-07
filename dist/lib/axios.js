"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = _default;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _axios = _interopRequireDefault(require("axios"));

function _default(opts) {
  // 封装好的get和post接口，调用方法情况action文件
  var $axios = _axios["default"].create((0, _objectSpread2["default"])({
    timeout: 5000,
    // 设置超时时间
    headers: {
      'X-Custom-Header': 'foobar'
    }
  }, opts)); // We cannot extend Axios.prototype


  var axiosExtraProto = {}; // Sets a common header

  axiosExtraProto.setHeader = function setHeader(name, value, scopes) {
    var _this = this;

    if (scopes === void 0) {
      scopes = 'common';
    }

    if (!(0, _isArray["default"])(scopes)) {
      scopes = [scopes];
    }

    scopes.forEach(function (scope) {
      if (!value) {
        delete _this.defaults.headers[scope][name];
        return;
      }

      _this.defaults.headers[scope][name] = value;
    });
  }; // Set requests token


  axiosExtraProto.setToken = function setToken(token, type, scopes) {
    if (scopes === void 0) {
      scopes = 'common';
    }

    var value = !token ? null : (type ? type + ' ' : '') + token;
    this.setHeader('Authorization', value, scopes);
  }; // Request helpers


  var reqMethods = ['request', 'delete', 'get', 'head', 'options', // url, config
  'post', 'put', 'patch' // url, data, config
  ];
  reqMethods.forEach(function (method) {
    axiosExtraProto['$' + method] = function () {
      return this[method].apply(this, arguments).then(function (res) {
        return res.data;
      });
    };
  }); // Setup all helpers to axios instance (Axios.prototype cannot be modified)

  function setupHelpers($axios) {
    for (var key in axiosExtraProto) {
      $axios[key] = axiosExtraProto[key].bind(_axios["default"]);
    }
  }

  setupHelpers($axios); // Add a request interceptor

  $axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return _promise["default"].reject(error);
  }); // Add a response interceptor

  $axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return _promise["default"].reject(error);
  });
  return $axios;
}