"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = errorOverlayMiddleware;

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-int"));

var _url = _interopRequireDefault(require("url"));

var _launchEditor = _interopRequireDefault(require("launch-editor"));

function errorOverlayMiddleware(req, res, next) {
  if (req.url.startsWith('/_next/development/open-stack-frame-in-editor')) {
    var query = _url["default"].parse(req.url, true).query;

    var lineNumber = (0, _parseInt2["default"])(query.lineNumber, 10) || 1;
    var colNumber = (0, _parseInt2["default"])(query.colNumber, 10) || 1;
    (0, _launchEditor["default"])(query.fileName + ":" + lineNumber + ":" + colNumber);
    res.end();
  } else {
    next();
  }
}