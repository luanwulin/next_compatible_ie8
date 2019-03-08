"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = asset;
exports.setAssetPrefix = setAssetPrefix;

require("core-js/modules/es6.regexp.replace");

var assetPrefix;

function asset(path) {
  // If the URL starts with http, we assume it's an
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  var pathWithoutSlash = path.replace(/^\//, '');
  return "".concat(assetPrefix || '', "/static/").concat(pathWithoutSlash);
}

function setAssetPrefix(url) {
  assetPrefix = url;
}