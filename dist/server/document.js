'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextScript = exports.Main = exports.Head = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _htmlescape = require('htmlescape');

var _htmlescape2 = _interopRequireDefault(_htmlescape);

var _server = require('styled-jsx/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Fragment = _react2['default'].Fragment || function Fragment(_ref) {
  var children = _ref.children;

  return _react2['default'].createElement(
    'div',
    null,
    children
  );
};

var Document = function (_Component) {
  (0, _inherits3['default'])(Document, _Component);

  function Document() {
    (0, _classCallCheck3['default'])(this, Document);
    return (0, _possibleConstructorReturn3['default'])(this, _Component.apply(this, arguments));
  }

  Document.getInitialProps = function getInitialProps(_ref2) {
    var renderPage = _ref2.renderPage;

    var _renderPage = renderPage(),
        html = _renderPage.html,
        head = _renderPage.head,
        errorHtml = _renderPage.errorHtml,
        chunks = _renderPage.chunks;

    var styles = (0, _server2['default'])();
    return { html: html, head: head, errorHtml: errorHtml, chunks: chunks, styles: styles };
  };

  Document.prototype.getChildContext = function getChildContext() {
    return { _documentProps: this.props };
  };

  Document.prototype.render = function render() {
    return _react2['default'].createElement(
      'html',
      null,
      _react2['default'].createElement(Head, null),
      _react2['default'].createElement(
        'body',
        null,
        _react2['default'].createElement(Main, null),
        _react2['default'].createElement(NextScript, null)
      )
    );
  };

  return Document;
}(_react.Component);

Document.childContextTypes = {
  _documentProps: _propTypes2['default'].any
};
exports['default'] = Document;

var Head = exports.Head = function (_Component2) {
  (0, _inherits3['default'])(Head, _Component2);

  function Head() {
    (0, _classCallCheck3['default'])(this, Head);
    return (0, _possibleConstructorReturn3['default'])(this, _Component2.apply(this, arguments));
  }

  Head.prototype.getChunkPreloadLink = function getChunkPreloadLink(filename) {
    var __NEXT_DATA__ = this.context._documentProps.__NEXT_DATA__;
    var buildStats = __NEXT_DATA__.buildStats,
        assetPrefix = __NEXT_DATA__.assetPrefix,
        buildId = __NEXT_DATA__.buildId;

    var hash = buildStats ? buildStats[filename].hash : buildId;

    return _react2['default'].createElement('link', {
      key: filename,
      rel: 'preload',
      href: assetPrefix + '/_next/' + hash + '/' + filename,
      as: 'script'
    });
  };

  Head.prototype.getPreloadMainLinks = function getPreloadMainLinks() {
    var dev = this.context._documentProps.dev;

    if (dev) {
      return [this.getChunkPreloadLink('manifest.js'), this.getChunkPreloadLink('commons.js'), this.getChunkPreloadLink('main.js')];
    }

    // In the production mode, we have a single asset with all the JS content.
    return [this.getChunkPreloadLink('app.js')];
  };

  Head.prototype.getPreloadDynamicChunks = function getPreloadDynamicChunks() {
    var _context$_documentPro = this.context._documentProps,
        chunks = _context$_documentPro.chunks,
        __NEXT_DATA__ = _context$_documentPro.__NEXT_DATA__;
    var assetPrefix = __NEXT_DATA__.assetPrefix;

    return chunks.filenames.map(function (chunk) {
      return _react2['default'].createElement('link', {
        key: chunk,
        rel: 'preload',
        href: assetPrefix + '/_next/webpack/chunks/' + chunk,
        as: 'script'
      });
    });
  };

  Head.prototype.render = function render() {
    var _context$_documentPro2 = this.context._documentProps,
        head = _context$_documentPro2.head,
        styles = _context$_documentPro2.styles,
        __NEXT_DATA__ = _context$_documentPro2.__NEXT_DATA__;
    var pathname = __NEXT_DATA__.pathname,
        buildId = __NEXT_DATA__.buildId,
        assetPrefix = __NEXT_DATA__.assetPrefix;

    var pagePathname = getPagePathname(pathname);

    return _react2['default'].createElement(
      'head',
      this.props,
      (head || []).map(function (h, i) {
        return _react2['default'].cloneElement(h, { key: h.key || i });
      }),
      _react2['default'].createElement('link', { rel: 'preload', href: assetPrefix + '/_next/' + buildId + '/page' + pagePathname, as: 'script' }),
      _react2['default'].createElement('link', { rel: 'preload', href: assetPrefix + '/_next/' + buildId + '/page/_error.js', as: 'script' }),
      this.getPreloadDynamicChunks(),
      this.getPreloadMainLinks(),
      styles || null,
      this.props.children
    );
  };

  return Head;
}(_react.Component);

Head.contextTypes = {
  _documentProps: _propTypes2['default'].any
};

var Main = exports.Main = function (_Component3) {
  (0, _inherits3['default'])(Main, _Component3);

  function Main() {
    (0, _classCallCheck3['default'])(this, Main);
    return (0, _possibleConstructorReturn3['default'])(this, _Component3.apply(this, arguments));
  }

  Main.prototype.render = function render() {
    var _context$_documentPro3 = this.context._documentProps,
        html = _context$_documentPro3.html,
        errorHtml = _context$_documentPro3.errorHtml;

    return _react2['default'].createElement(
      Fragment,
      null,
      _react2['default'].createElement('div', { id: '__next', dangerouslySetInnerHTML: { __html: html } }),
      _react2['default'].createElement('div', { id: '__next-error', dangerouslySetInnerHTML: { __html: errorHtml } })
    );
  };

  return Main;
}(_react.Component);

Main.contextTypes = {
  _documentProps: _propTypes2['default'].any
};

var NextScript = exports.NextScript = function (_Component4) {
  (0, _inherits3['default'])(NextScript, _Component4);

  function NextScript() {
    (0, _classCallCheck3['default'])(this, NextScript);
    return (0, _possibleConstructorReturn3['default'])(this, _Component4.apply(this, arguments));
  }

  NextScript.prototype.getChunkScript = function getChunkScript(filename) {
    var additionalProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var __NEXT_DATA__ = this.context._documentProps.__NEXT_DATA__;
    var buildStats = __NEXT_DATA__.buildStats,
        assetPrefix = __NEXT_DATA__.assetPrefix,
        buildId = __NEXT_DATA__.buildId;

    var hash = buildStats ? buildStats[filename].hash : buildId;

    return _react2['default'].createElement('script', (0, _extends3['default'])({
      key: filename,
      type: 'text/javascript',
      src: assetPrefix + '/_next/' + hash + '/' + filename
    }, additionalProps));
  };

  NextScript.prototype.getScripts = function getScripts() {
    var dev = this.context._documentProps.dev;

    if (dev) {
      return [this.getChunkScript('manifest.js'), this.getChunkScript('commons.js'), this.getChunkScript('main.js')];
    }

    // In the production mode, we have a single asset with all the JS content.
    // So, we can load the script with async
    return [this.getChunkScript('app.js', { async: true })];
  };

  NextScript.prototype.getDynamicChunks = function getDynamicChunks() {
    var _context$_documentPro4 = this.context._documentProps,
        chunks = _context$_documentPro4.chunks,
        __NEXT_DATA__ = _context$_documentPro4.__NEXT_DATA__;
    var assetPrefix = __NEXT_DATA__.assetPrefix;

    return _react2['default'].createElement(
      Fragment,
      null,
      chunks.filenames.map(function (chunk) {
        return _react2['default'].createElement('script', {
          async: true,
          key: chunk,
          type: 'text/javascript',
          src: assetPrefix + '/_next/webpack/chunks/' + chunk
        });
      })
    );
  };

  NextScript.prototype.render = function render() {
    var _context$_documentPro5 = this.context._documentProps,
        staticMarkup = _context$_documentPro5.staticMarkup,
        __NEXT_DATA__ = _context$_documentPro5.__NEXT_DATA__,
        chunks = _context$_documentPro5.chunks;
    var pathname = __NEXT_DATA__.pathname,
        buildId = __NEXT_DATA__.buildId,
        assetPrefix = __NEXT_DATA__.assetPrefix;

    var pagePathname = getPagePathname(pathname);

    __NEXT_DATA__.chunks = chunks.names;

    return _react2['default'].createElement(
      Fragment,
      null,
      staticMarkup ? null : _react2['default'].createElement('script', { nonce: this.props.nonce, dangerouslySetInnerHTML: {
          __html: '\n          __NEXT_DATA__ = ' + (0, _htmlescape2['default'])(__NEXT_DATA__) + '\n          module={}\n          __NEXT_LOADED_PAGES__ = []\n          __NEXT_LOADED_CHUNKS__ = []\n\n          __NEXT_REGISTER_PAGE = function (route, fn) {\n            __NEXT_LOADED_PAGES__.push({ route: route, fn: fn })\n          }\n\n          __NEXT_REGISTER_CHUNK = function (chunkName, fn) {\n            __NEXT_LOADED_CHUNKS__.push({ chunkName: chunkName, fn: fn })\n          }\n        '
        } }),
      _react2['default'].createElement('script', { async: true, id: '__NEXT_PAGE__' + pathname, type: 'text/javascript', src: assetPrefix + '/_next/' + buildId + '/page' + pagePathname }),
      _react2['default'].createElement('script', { async: true, id: '__NEXT_PAGE__/_error', type: 'text/javascript', src: assetPrefix + '/_next/' + buildId + '/page/_error.js' }),
      staticMarkup ? null : this.getDynamicChunks(),
      staticMarkup ? null : this.getScripts()
    );
  };

  return NextScript;
}(_react.Component);

NextScript.propTypes = {
  nonce: _propTypes2['default'].string
};
NextScript.contextTypes = {
  _documentProps: _propTypes2['default'].any
};


function getPagePathname(pathname) {
  if (pathname === '/') {
    return '/index.js';
  }

  return pathname + '.js';
}