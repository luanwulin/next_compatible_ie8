"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var env = process.env.NODE_ENV;
var isProduction = env === 'production';
var isDevelopment = env === 'development';
var isTest = env === 'test'; // Resolve styled-jsx plugins

function styledJsxOptions(opts) {
  if (!opts) {
    return {};
  }

  if (!(0, _isArray["default"])(opts.plugins)) {
    return opts;
  }

  opts.plugins = opts.plugins.map(function (plugin) {
    if ((0, _isArray["default"])(plugin)) {
      var name = plugin[0],
          options = plugin[1];
      return [require.resolve(name), options];
    }

    return require.resolve(plugin);
  });
  return opts;
}

module.exports = function (context, opts) {
  if (opts === void 0) {
    opts = {};
  }

  return {
    presets: [[require('@babel/preset-env')["default"], (0, _objectSpread2["default"])({
      // In the test environment `modules` is often needed to be set to true, babel figures that out by itself using the `'auto'` option
      // In production/development this option is set to `false` so that webpack can handle import/export with tree-shaking
      modules: isDevelopment || isProduction ? false : 'auto',
      useBuiltIns: 'entry',
      targets: {
        'browsers': ['ie >= 8']
      },
      loose: true
    }, opts['preset-env'])], [require('@babel/preset-react'), (0, _objectSpread2["default"])({
      // This adds @babel/plugin-transform-react-jsx-source and
      // @babel/plugin-transform-react-jsx-self automatically in development
      development: isDevelopment || isTest
    }, opts['preset-react'])]],
    plugins: [require('babel-plugin-react-require'), require('@babel/plugin-syntax-dynamic-import'), require('./plugins/react-loadable-plugin'), [require('@babel/plugin-proposal-class-properties'), opts['class-properties'] || {}], require('@babel/plugin-proposal-object-rest-spread'), require('babel-plugin-transform-es3-property-literals'), require('babel-plugin-transform-es3-member-expression-literals'), [require('@babel/plugin-transform-runtime'), (0, _objectSpread2["default"])({
      helpers: false,
      regenerator: true
    }, opts['transform-runtime'])], [require('styled-jsx/babel'), styledJsxOptions(opts['styled-jsx'])], process.env.NODE_ENV === 'production' && require('babel-plugin-transform-react-remove-prop-types')].filter(Boolean)
  };
};