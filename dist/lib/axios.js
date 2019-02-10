'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = function (opts) {
  // 封装好的get和post接口，调用方法情况action文件
  var $axios = _axios2['default'].create((0, _extends3['default'])({
    timeout: 5000, // 设置超时时间
    headers: { 'X-Custom-Header': 'foobar' }
  }, opts));

  // We cannot extend Axios.prototype
  var axiosExtraProto = {};

  // Sets a common header
  axiosExtraProto.setHeader = function setHeader(name, value) {
    var _this = this;

    var scopes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'common';

    if (!Array.isArray(scopes)) {
      scopes = [scopes];
    }
    scopes.forEach(function (scope) {
      if (!value) {
        delete _this.defaults.headers[scope][name];
        return;
      }
      _this.defaults.headers[scope][name] = value;
    });
  };

  // Set requests token
  axiosExtraProto.setToken = function setToken(token, type) {
    var scopes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'common';

    var value = !token ? null : (type ? type + ' ' : '') + token;
    this.setHeader('Authorization', value, scopes);
  };

  // Request helpers
  var reqMethods = ['request', 'delete', 'get', 'head', 'options', // url, config
  'post', 'put', 'patch' // url, data, config
  ];
  reqMethods.forEach(function (method) {
    axiosExtraProto['$' + method] = function () {
      return this[method].apply(this, arguments).then(function (res) {
        return res.data;
      });
    };
  });

  // Setup all helpers to axios instance (Axios.prototype cannot be modified)
  function setupHelpers($axios) {
    for (var key in axiosExtraProto) {
      $axios[key] = axiosExtraProto[key].bind(_axios2['default']);
    }
  }

  setupHelpers($axios);

  // Add a request interceptor
  $axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return _promise2['default'].reject(error);
  });

  // Add a response interceptor
  $axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return _promise2['default'].reject(error);
  });

  return $axios;
};

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }