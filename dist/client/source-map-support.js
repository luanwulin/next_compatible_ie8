"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewriteStacktrace = rewriteStacktrace;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.regexp.split");

var filenameRE = /\(([^)]+\.js):(\d+):(\d+)\)$/;

function rewriteStacktrace(e, distDir) {
  if (!e || typeof e.stack !== 'string') {
    return;
  }

  var lines = e.stack.split('\n');
  var result = lines.map(function (line) {
    return rewriteTraceLine(line, distDir);
  });
  e.stack = result.join('\n');
}

function rewriteTraceLine(trace, distDir) {
  var m = trace.match(filenameRE);

  if (m == null) {
    return trace;
  }

  var filename = m[1];
  var filenameLink = filename.replace(distDir, '/_next/development').replace(/\\/g, '/');
  trace = trace.replace(filename, filenameLink);
  return trace;
}