"use strict";

exports.__esModule = true;
exports["default"] = void 0;

// This plugin mirrors webpack 3 `filename` and `chunkfilename` behavior
// This fixes https://github.com/webpack/webpack/issues/6598
// This plugin is based on https://github.com/researchgate/webpack/commit/2f28947fa0c63ccbb18f39c0098bd791a2c37090
var ChunkNamesPlugin =
/*#__PURE__*/
function () {
  function ChunkNamesPlugin() {}

  var _proto = ChunkNamesPlugin.prototype;

  _proto.apply = function apply(compiler) {
    compiler.hooks.compilation.tap('NextJsChunkNamesPlugin', function (compilation) {
      compilation.chunkTemplate.hooks.renderManifest.intercept({
        register: function register(tapInfo) {
          if (tapInfo.name === 'JavascriptModulesPlugin') {
            var originalMethod = tapInfo.fn;

            tapInfo.fn = function (result, options) {
              var filenameTemplate;
              var chunk = options.chunk;
              var outputOptions = options.outputOptions;

              if (chunk.filenameTemplate) {
                filenameTemplate = chunk.filenameTemplate;
              } else if (chunk.hasEntryModule()) {
                filenameTemplate = outputOptions.filename;
              } else {
                filenameTemplate = outputOptions.chunkFilename;
              }

              options.chunk.filenameTemplate = filenameTemplate;
              return originalMethod(result, options);
            };
          }

          return tapInfo;
        }
      });
    });
  };

  return ChunkNamesPlugin;
}();

exports["default"] = ChunkNamesPlugin;