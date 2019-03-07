"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ReactLoadablePlugin = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _isArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _url = _interopRequireDefault(require("url"));

/**
COPYRIGHT (c) 2017-present James Kyle <me@thejameskyle.com>
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
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWAR
*/
// Implementation of this PR: https://github.com/jamiebuilds/react-loadable/pull/132
// Modified to strip out unneeded results for Next's specific use case
function buildManifest(compiler, compilation) {
  var context = compiler.options.context;
  var manifest = {};
  compilation.chunks.forEach(function (chunk) {
    chunk.files.forEach(function (file) {
      for (var _iterator = chunk.modulesIterable, _isArray = (0, _isArray2["default"])(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator2["default"])(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var module = _ref;
        var id = module.id;
        var name = typeof module.libIdent === 'function' ? module.libIdent({
          context: context
        }) : null; // If it doesn't end in `.js` Next.js can't handle it right now.

        if (!file.match(/\.js$/) || !file.match(/^static\/chunks\//)) {
          return;
        }

        var publicPath = _url["default"].resolve(compilation.outputOptions.publicPath || '', file);

        var currentModule = module;

        if (module.constructor.name === 'ConcatenatedModule') {
          currentModule = module.rootModule;
        }

        if (!manifest[currentModule.rawRequest]) {
          manifest[currentModule.rawRequest] = [];
        }

        manifest[currentModule.rawRequest].push({
          id: id,
          name: name,
          file: file,
          publicPath: publicPath
        });
      }
    });
  });
  return manifest;
}

var ReactLoadablePlugin =
/*#__PURE__*/
function () {
  function ReactLoadablePlugin(opts) {
    if (opts === void 0) {
      opts = {};
    }

    this.filename = opts.filename;
  }

  var _proto = ReactLoadablePlugin.prototype;

  _proto.apply = function apply(compiler) {
    var _this = this;

    compiler.hooks.emit.tapAsync('ReactLoadableManifest', function (compilation, callback) {
      var manifest = buildManifest(compiler, compilation);
      var json = (0, _stringify["default"])(manifest, null, 2);
      compilation.assets[_this.filename] = {
        source: function source() {
          return json;
        },
        size: function size() {
          return json.length;
        }
      };
      callback();
    });
  };

  return ReactLoadablePlugin;
}();

exports.ReactLoadablePlugin = ReactLoadablePlugin;