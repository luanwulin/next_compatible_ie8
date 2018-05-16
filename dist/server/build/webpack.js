'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _path = require('path');

var _crypto = require('crypto');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

var _writeFileWebpackPlugin = require('write-file-webpack-plugin');

var _writeFileWebpackPlugin2 = _interopRequireDefault(_writeFileWebpackPlugin);

var _friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var _friendlyErrorsWebpackPlugin2 = _interopRequireDefault(_friendlyErrorsWebpackPlugin);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _unlinkFilePlugin = require('./plugins/unlink-file-plugin');

var _unlinkFilePlugin2 = _interopRequireDefault(_unlinkFilePlugin);

var _pagesPlugin = require('./plugins/pages-plugin');

var _pagesPlugin2 = _interopRequireDefault(_pagesPlugin);

var _dynamicChunksPlugin = require('./plugins/dynamic-chunks-plugin');

var _dynamicChunksPlugin2 = _interopRequireDefault(_dynamicChunksPlugin);

var _combineAssetsPlugin = require('./plugins/combine-assets-plugin');

var _combineAssetsPlugin2 = _interopRequireDefault(_combineAssetsPlugin);

var _es3ifyWebpackPlugin = require('es3ify-webpack-plugin');

var _es3ifyWebpackPlugin2 = _interopRequireDefault(_es3ifyWebpackPlugin);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _babelCore = require('babel-core');

var babelCore = _interopRequireWildcard(_babelCore);

var _findConfig = require('./babel/find-config');

var _findConfig2 = _interopRequireDefault(_findConfig);

var _rootModuleRelativePath = require('./root-module-relative-path');

var _rootModuleRelativePath2 = _interopRequireDefault(_rootModuleRelativePath);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documentPage = (0, _path.join)('pages', '_document.js');
var defaultPages = ['_error.js', '_document.js'];
var nextPagesDir = (0, _path.join)(__dirname, '..', '..', 'pages');
var nextNodeModulesDir = (0, _path.join)(__dirname, '..', '..', '..', 'node_modules');
var interpolateNames = new _map2.default(defaultPages.map(function (p) {
    return [(0, _path.join)(nextPagesDir, p), 'dist/pages/' + p];
}));

var relativeResolve = (0, _rootModuleRelativePath2.default)(require);

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dir) {
        var _this = this;

        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            buildId = _ref2.buildId,
            _ref2$dev = _ref2.dev,
            dev = _ref2$dev === undefined ? false : _ref2$dev,
            _ref2$quiet = _ref2.quiet,
            quiet = _ref2$quiet === undefined ? false : _ref2$quiet,
            buildDir = _ref2.buildDir,
            _ref2$conf = _ref2.conf,
            conf = _ref2$conf === undefined ? null : _ref2$conf;

        var config, defaultEntries, mainJS, totalPages, entry, plugins, nodePathList, mainBabelOptions, externalBabelConfig, options, rules, webpackConfig;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        dir = (0, _path.resolve)(dir);
                        config = (0, _config2.default)(dir, conf);
                        defaultEntries = dev ? [(0, _path.join)(__dirname, '..', '..', 'client', 'webpack-hot-middleware-client'), (0, _path.join)(__dirname, '..', '..', 'client', 'on-demand-entries-client')] : [];
                        mainJS = dev ? require.resolve('../../client/next-dev') : require.resolve('../../client/next');
                        totalPages = void 0;

                        entry = function () {
                            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                                var entries, pages, devPages, _iterator, _isArray, _i, _ref4, p, _iterator2, _isArray2, _i2, _ref5, _p, _iterator3, _isArray3, _i3, _ref6, _p2, entryName;

                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                entries = {
                                                    'main.js': [].concat(defaultEntries, config.clientBootstrap || [], [mainJS])
                                                };
                                                _context.next = 3;
                                                return (0, _globPromise2.default)('pages/**/*.js', { cwd: dir });

                                            case 3:
                                                pages = _context.sent;
                                                devPages = pages.filter(function (p) {
                                                    return p === 'pages/_document.js' || p === 'pages/_error.js';
                                                });

                                                if (!dev) {
                                                    _context.next = 23;
                                                    break;
                                                }

                                                _iterator = devPages, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

                                            case 7:
                                                if (!_isArray) {
                                                    _context.next = 13;
                                                    break;
                                                }

                                                if (!(_i >= _iterator.length)) {
                                                    _context.next = 10;
                                                    break;
                                                }

                                                return _context.abrupt('break', 21);

                                            case 10:
                                                _ref4 = _iterator[_i++];
                                                _context.next = 17;
                                                break;

                                            case 13:
                                                _i = _iterator.next();

                                                if (!_i.done) {
                                                    _context.next = 16;
                                                    break;
                                                }

                                                return _context.abrupt('break', 21);

                                            case 16:
                                                _ref4 = _i.value;

                                            case 17:
                                                p = _ref4;

                                                entries[(0, _path.join)('bundles', p)] = ['./' + p + '?entry'];

                                            case 19:
                                                _context.next = 7;
                                                break;

                                            case 21:
                                                _context.next = 38;
                                                break;

                                            case 23:
                                                _iterator2 = pages, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

                                            case 24:
                                                if (!_isArray2) {
                                                    _context.next = 30;
                                                    break;
                                                }

                                                if (!(_i2 >= _iterator2.length)) {
                                                    _context.next = 27;
                                                    break;
                                                }

                                                return _context.abrupt('break', 38);

                                            case 27:
                                                _ref5 = _iterator2[_i2++];
                                                _context.next = 34;
                                                break;

                                            case 30:
                                                _i2 = _iterator2.next();

                                                if (!_i2.done) {
                                                    _context.next = 33;
                                                    break;
                                                }

                                                return _context.abrupt('break', 38);

                                            case 33:
                                                _ref5 = _i2.value;

                                            case 34:
                                                _p = _ref5;

                                                entries[(0, _path.join)('bundles', _p)] = ['./' + _p + '?entry'];

                                            case 36:
                                                _context.next = 24;
                                                break;

                                            case 38:
                                                _iterator3 = defaultPages, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);

                                            case 39:
                                                if (!_isArray3) {
                                                    _context.next = 45;
                                                    break;
                                                }

                                                if (!(_i3 >= _iterator3.length)) {
                                                    _context.next = 42;
                                                    break;
                                                }

                                                return _context.abrupt('break', 54);

                                            case 42:
                                                _ref6 = _iterator3[_i3++];
                                                _context.next = 49;
                                                break;

                                            case 45:
                                                _i3 = _iterator3.next();

                                                if (!_i3.done) {
                                                    _context.next = 48;
                                                    break;
                                                }

                                                return _context.abrupt('break', 54);

                                            case 48:
                                                _ref6 = _i3.value;

                                            case 49:
                                                _p2 = _ref6;
                                                entryName = (0, _path.join)('bundles', 'pages', _p2);

                                                if (!entries[entryName]) {
                                                    entries[entryName] = [(0, _path.join)(nextPagesDir, _p2) + '?entry'];
                                                }

                                            case 52:
                                                _context.next = 39;
                                                break;

                                            case 54:

                                                totalPages = pages.filter(function (p) {
                                                    return p !== documentPage;
                                                }).length;

                                                return _context.abrupt('return', entries);

                                            case 56:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function entry() {
                                return _ref3.apply(this, arguments);
                            };
                        }();

                        plugins = [new _webpack2.default.IgnorePlugin(/(precomputed)/, /node_modules.+(elliptic)/), new _webpack2.default.LoaderOptionsPlugin({
                            options: {
                                context: dir,
                                customInterpolateName: function customInterpolateName(url, name, opts) {
                                    return interpolateNames.get(this.resourcePath) || url;
                                }
                            }
                        }), new _writeFileWebpackPlugin2.default({
                            exitOnErrors: false,
                            log: false,

                            useHashIndex: false
                        }), new _webpack2.default.optimize.CommonsChunkPlugin({
                            name: 'commons',
                            filename: 'commons.js',
                            minChunks: function minChunks(module, count) {
                                if (module.context && module.context.indexOf(_path.sep + 'react-dom' + _path.sep) >= 0) {
                                    return true;
                                }

                                if (dev) {
                                    return false;
                                }

                                if (totalPages <= 2) {
                                    return count >= totalPages;
                                }
                                return count >= totalPages * 0.5;
                            }
                        }), new _webpack2.default.optimize.CommonsChunkPlugin({
                            name: 'manifest',
                            filename: 'manifest.js'
                        }), new _webpack2.default.DefinePlugin({
                            'process.env.NODE_ENV': (0, _stringify2.default)(dev ? 'development' : 'production')
                        }), new _pagesPlugin2.default(), new _dynamicChunksPlugin2.default(), new _caseSensitivePathsWebpackPlugin2.default(), new _es3ifyWebpackPlugin2.default()];


                        if (dev) {
                            plugins.push(new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoEmitOnErrorsPlugin(), new _unlinkFilePlugin2.default());
                            if (!quiet) {
                                plugins.push(new _friendlyErrorsWebpackPlugin2.default());
                            }
                        } else {
                            plugins.push(new _webpack2.default.IgnorePlugin(/react-hot-loader/));
                            plugins.push(new _combineAssetsPlugin2.default({
                                input: ['manifest.js', 'commons.js', 'main.js'],
                                output: 'app.js'
                            }), new _webpack2.default.optimize.UglifyJsPlugin({
                                compress: { warnings: false },
                                sourceMap: false
                            }));
                            plugins.push(new _webpack2.default.optimize.ModuleConcatenationPlugin());
                        }

                        nodePathList = (process.env.NODE_PATH || '').split(process.platform === 'win32' ? ';' : ':').filter(function (p) {
                            return !!p;
                        });
                        mainBabelOptions = {
                            cacheDirectory: true,
                            presets: []
                        };
                        externalBabelConfig = (0, _findConfig2.default)(dir);

                        if (externalBabelConfig) {
                            console.log('> Using external babel configuration');
                            console.log('> Location: "' + externalBabelConfig.loc + '"');
                            options = externalBabelConfig.options;

                            mainBabelOptions.babelrc = options.babelrc !== false;
                        } else {
                            mainBabelOptions.babelrc = false;
                        }

                        if (!mainBabelOptions.babelrc) {
                            mainBabelOptions.presets.push(require.resolve('./babel/preset'));
                        }

                        rules = (dev ? [{
                            test: /\.js(\?[^?]*)?$/,
                            loader: 'hot-self-accept-loader',
                            include: [(0, _path.join)(dir, 'pages'), nextPagesDir]
                        }, {
                            test: /\.js(\?[^?]*)?$/,
                            loader: 'react-hot-loader/webpack',
                            exclude: /node_modules/
                        }] : []).concat([{
                            test: /\.json$/,
                            loader: 'json-loader'
                        }, {
                            test: /\.(js|json)(\?[^?]*)?$/,
                            loader: 'emit-file-loader',
                            include: [dir, nextPagesDir],
                            exclude: function exclude(str) {
                                return (/node_modules/.test(str) && str.indexOf(nextPagesDir) !== 0
                                );
                            },

                            options: {
                                name: 'dist/[path][name].[ext]',
                                transform: function transform(_ref7) {
                                    var content = _ref7.content,
                                        sourceMap = _ref7.sourceMap,
                                        interpolatedName = _ref7.interpolatedName;

                                    if (!/\.js$/.test(interpolatedName)) {
                                        return { content: content, sourceMap: sourceMap };
                                    }

                                    var transpiled = babelCore.transform(content, {
                                        babelrc: false,
                                        sourceMaps: dev ? 'both' : false,

                                        plugins: [[require.resolve('babel-plugin-transform-es2015-modules-commonjs')], [require.resolve('babel-plugin-module-resolver'), {
                                            alias: {
                                                'babel-runtime': relativeResolve('babel-runtime/package'),
                                                'next/link': relativeResolve('../../lib/link'),
                                                'next/prefetch': relativeResolve('../../lib/prefetch'),
                                                'next/css': relativeResolve('../../lib/css'),
                                                'next/dynamic': relativeResolve('../../lib/dynamic'),
                                                'next/head': relativeResolve('../../lib/head'),
                                                'next/document': relativeResolve('../../server/document'),
                                                'next/router': relativeResolve('../../lib/router'),
                                                'next/error': relativeResolve('../../lib/error'),
                                                'styled-jsx/style': relativeResolve('styled-jsx/style')
                                            }
                                        }]],
                                        inputSourceMap: sourceMap
                                    });

                                    var map = transpiled.map;

                                    var output = transpiled.code;

                                    if (map) {
                                        var nodeMap = (0, _assign2.default)({}, map);
                                        nodeMap.sources = nodeMap.sources.map(function (source) {
                                            return source.replace(/\?entry/, '');
                                        });
                                        delete nodeMap.sourcesContent;

                                        var sourceMapUrl = new Buffer((0, _stringify2.default)(nodeMap), 'utf-8').toString('base64');
                                        output = output + '\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,' + sourceMapUrl;
                                    }

                                    return {
                                        content: output,
                                        sourceMap: transpiled.map
                                    };
                                }
                            }
                        }, {
                            loader: 'babel-loader',
                            include: nextPagesDir,
                            exclude: function exclude(str) {
                                return (/node_modules/.test(str) && str.indexOf(nextPagesDir) !== 0
                                );
                            },

                            options: {
                                babelrc: false,
                                cacheDirectory: true,
                                presets: [require.resolve('./babel/preset')]
                            }
                        }, {
                            test: /\.js(\?[^?]*)?$/,
                            loader: 'babel-loader',
                            include: [dir],
                            exclude: function exclude(str) {
                                return (/node_modules/.test(str)
                                );
                            },

                            options: mainBabelOptions
                        }]);
                        webpackConfig = {
                            context: dir,
                            entry: entry,
                            output: {
                                path: buildDir ? (0, _path.join)(buildDir, '.next') : (0, _path.join)(dir, config.distDir),
                                filename: '[name]',
                                libraryTarget: 'commonjs2',
                                publicPath: '/_next/' + buildId + '/webpack/',
                                strictModuleExceptionHandling: true,
                                devtoolModuleFilenameTemplate: function devtoolModuleFilenameTemplate(_ref8) {
                                    var resourcePath = _ref8.resourcePath;

                                    var hash = (0, _crypto.createHash)('sha1');
                                    hash.update(Date.now() + '');
                                    var id = hash.digest('hex').slice(0, 7);

                                    return 'webpack:///' + resourcePath + '?' + id;
                                },

                                chunkFilename: '[name]'
                            },
                            resolve: {
                                modules: [nextNodeModulesDir, 'node_modules'].concat(nodePathList),
                                alias: {
                                    'react': 'anujs/dist/ReactIE',
                                    'react-dom$': 'anujs/dist/ReactIE',
                                    'react-dom/server': 'anujs/dist/ReactDOMServer',
                                    'redux': 'anujs/lib/ReduxIE',
                                    'prop-types': 'anujs/lib/ReactPropTypes',
                                    'create-react-class': 'anujs/lib/createClass',
                                    'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',
                                    'devtools': "anujs/lib/devtools"
                                }
                            },
                            resolveLoader: {
                                modules: [nextNodeModulesDir, 'node_modules', (0, _path.join)(__dirname, 'loaders')].concat(nodePathList)
                            },
                            plugins: plugins,
                            module: {
                                rules: rules
                            },
                            devtool: dev ? 'cheap-module-inline-source-map' : false,
                            performance: { hints: false }
                        };

                        if (!config.webpack) {
                            _context2.next = 20;
                            break;
                        }

                        console.log('> Using "webpack" config function defined in ' + config.configOrigin + '.');
                        _context2.next = 19;
                        return config.webpack(webpackConfig, { buildId: buildId, dev: dev });

                    case 19:
                        webpackConfig = _context2.sent;

                    case 20:
                        return _context2.abrupt('return', (0, _webpack2.default)(webpackConfig));

                    case 21:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    function createCompiler(_x2) {
        return _ref.apply(this, arguments);
    }

    return createCompiler;
}();