"use strict";

exports.__esModule = true;
exports["default"] = asset;
exports.setAssetPrefix = setAssetPrefix;
var assetPrefix;

function asset(path) {
  // If the URL starts with http, we assume it's an
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  var pathWithoutSlash = path.replace(/^\//, '');
  return (assetPrefix || '') + "/static/" + pathWithoutSlash;
}

function setAssetPrefix(url) {
  assetPrefix = url;
}