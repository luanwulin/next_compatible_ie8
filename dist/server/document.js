"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.NextScript = exports.Main = exports.Head = exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _htmlescape = _interopRequireDefault(require("htmlescape"));

var _server = _interopRequireDefault(require("styled-jsx/server"));

/* eslint-disable */
var Fragment = _react["default"].Fragment || function Fragment(_ref) {
  var children = _ref.children;
  return _react["default"].createElement("div", null, children);
};

var Document =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Document, _Component);

  function Document() {
    return _Component.apply(this, arguments) || this;
  }

  Document.getInitialProps = function getInitialProps(_ref2) {
    var renderPage = _ref2.renderPage;

    var _renderPage = renderPage(),
        html = _renderPage.html,
        head = _renderPage.head,
        buildManifest = _renderPage.buildManifest;

    var styles = (0, _server["default"])();
    return {
      html: html,
      head: head,
      styles: styles,
      buildManifest: buildManifest
    };
  };

  var _proto = Document.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      _documentProps: this.props
    };
  };

  _proto.render = function render() {
    return _react["default"].createElement("html", null, _react["default"].createElement(Head, null), _react["default"].createElement("body", null, _react["default"].createElement(Main, null), _react["default"].createElement(NextScript, null)));
  };

  return Document;
}(_react.Component);

exports["default"] = Document;
(0, _defineProperty2["default"])(Document, "childContextTypes", {
  _documentProps: _propTypes["default"].any
});

var Head =
/*#__PURE__*/
function (_Component2) {
  (0, _inheritsLoose2["default"])(Head, _Component2);

  function Head() {
    return _Component2.apply(this, arguments) || this;
  }

  var _proto2 = Head.prototype;

  _proto2.getCssLinks = function getCssLinks() {
    var _this = this;

    var _this$context$_docume = this.context._documentProps,
        assetPrefix = _this$context$_docume.assetPrefix,
        files = _this$context$_docume.files;

    if (!files || files.length === 0) {
      return null;
    }

    return files.map(function (file) {
      // Only render .css files here
      if (!/\.css$/.exec(file)) {
        return null;
      }

      return _react["default"].createElement("link", {
        key: file,
        nonce: _this.props.nonce,
        rel: "stylesheet",
        href: assetPrefix + "/_next/" + file
      });
    });
  };

  _proto2.getPreloadDynamicChunks = function getPreloadDynamicChunks() {
    var _this2 = this;

    var _this$context$_docume2 = this.context._documentProps,
        dynamicImports = _this$context$_docume2.dynamicImports,
        assetPrefix = _this$context$_docume2.assetPrefix;
    return dynamicImports.map(function (bundle) {
      return _react["default"].createElement("link", {
        rel: "preload",
        key: bundle.file,
        href: assetPrefix + "/_next/" + bundle.file,
        as: "script",
        nonce: _this2.props.nonce
      });
    });
  };

  _proto2.getPreloadMainLinks = function getPreloadMainLinks() {
    var _this3 = this;

    var _this$context$_docume3 = this.context._documentProps,
        assetPrefix = _this$context$_docume3.assetPrefix,
        files = _this$context$_docume3.files;

    if (!files || files.length === 0) {
      return null;
    }

    return files.map(function (file) {
      // Only render .js files here
      if (!/\.js$/.exec(file)) {
        return null;
      }

      return _react["default"].createElement("link", {
        key: file,
        nonce: _this3.props.nonce,
        rel: "preload",
        href: assetPrefix + "/_next/" + file,
        as: "script"
      });
    });
  };

  _proto2.render = function render() {
    var _this$context$_docume4 = this.context._documentProps,
        head = _this$context$_docume4.head,
        styles = _this$context$_docume4.styles,
        assetPrefix = _this$context$_docume4.assetPrefix,
        __NEXT_DATA__ = _this$context$_docume4.__NEXT_DATA__;
    var page = __NEXT_DATA__.page,
        buildId = __NEXT_DATA__.buildId;
    var pagePathname = getPagePathname(page);
    var children = this.props.children; // show a warning if Head contains <title> (only in development)

    if (process.env.NODE_ENV !== 'production') {
      children = _react["default"].Children.map(children, function (child) {
        if (child && child.type === 'title') {
          console.warn("Warning: <title> should not be used in _document.js's <Head>. https://err.sh/next.js/no-document-title");
        }

        return child;
      });
    }

    return _react["default"].createElement("head", this.props, head, page !== '/_error' && _react["default"].createElement("link", {
      rel: "preload",
      href: assetPrefix + "/_next/static/" + buildId + "/pages" + pagePathname,
      as: "script",
      nonce: this.props.nonce
    }), _react["default"].createElement("link", {
      rel: "preload",
      href: assetPrefix + "/_next/static/" + buildId + "/pages/_app.js",
      as: "script",
      nonce: this.props.nonce
    }), _react["default"].createElement("link", {
      rel: "preload",
      href: assetPrefix + "/_next/static/" + buildId + "/pages/_error.js",
      as: "script",
      nonce: this.props.nonce
    }), this.getPreloadDynamicChunks(), this.getPreloadMainLinks(), this.getCssLinks(), styles || null, children);
  };

  return Head;
}(_react.Component);

exports.Head = Head;
(0, _defineProperty2["default"])(Head, "contextTypes", {
  _documentProps: _propTypes["default"].any
});
(0, _defineProperty2["default"])(Head, "propTypes", {
  nonce: _propTypes["default"].string
});

var Main =
/*#__PURE__*/
function (_Component3) {
  (0, _inheritsLoose2["default"])(Main, _Component3);

  function Main() {
    return _Component3.apply(this, arguments) || this;
  }

  var _proto3 = Main.prototype;

  _proto3.render = function render() {
    var html = this.context._documentProps.html;
    return _react["default"].createElement("div", {
      id: "__next",
      dangerouslySetInnerHTML: {
        __html: html
      }
    });
  };

  return Main;
}(_react.Component);

exports.Main = Main;
(0, _defineProperty2["default"])(Main, "contextTypes", {
  _documentProps: _propTypes["default"].any
});

var NextScript =
/*#__PURE__*/
function (_Component4) {
  (0, _inheritsLoose2["default"])(NextScript, _Component4);

  function NextScript() {
    return _Component4.apply(this, arguments) || this;
  }

  var _proto4 = NextScript.prototype;

  _proto4.getDynamicChunks = function getDynamicChunks() {
    var _this4 = this;

    var _this$context$_docume5 = this.context._documentProps,
        dynamicImports = _this$context$_docume5.dynamicImports,
        assetPrefix = _this$context$_docume5.assetPrefix;
    return dynamicImports.map(function (bundle) {
      return _react["default"].createElement("script", {
        async: true,
        key: bundle.file,
        src: assetPrefix + "/_next/" + bundle.file,
        nonce: _this4.props.nonce
      });
    });
  };

  _proto4.getScripts = function getScripts() {
    var _this5 = this;

    var _this$context$_docume6 = this.context._documentProps,
        assetPrefix = _this$context$_docume6.assetPrefix,
        files = _this$context$_docume6.files;

    if (!files || files.length === 0) {
      return null;
    }

    return files.map(function (file) {
      // Only render .js files here
      if (!/\.js$/.exec(file)) {
        return null;
      }

      return _react["default"].createElement("script", {
        key: file,
        src: assetPrefix + "/_next/" + file,
        nonce: _this5.props.nonce,
        async: true
      });
    });
  };

  NextScript.getInlineScriptSource = function getInlineScriptSource(documentProps) {
    var __NEXT_DATA__ = documentProps.__NEXT_DATA__;
    var page = __NEXT_DATA__.page;
    return "__NEXT_DATA__ = " + (0, _htmlescape["default"])(__NEXT_DATA__) + ";__NEXT_LOADED_PAGES__=[];__NEXT_REGISTER_PAGE=function(r,f){__NEXT_LOADED_PAGES__.push([r, f])}";
  };

  _proto4.render = function render() {
    var _this6 = this;

    var _this$context$_docume7 = this.context._documentProps,
        staticMarkup = _this$context$_docume7.staticMarkup,
        assetPrefix = _this$context$_docume7.assetPrefix,
        devFiles = _this$context$_docume7.devFiles,
        __NEXT_DATA__ = _this$context$_docume7.__NEXT_DATA__;
    var page = __NEXT_DATA__.page,
        buildId = __NEXT_DATA__.buildId;
    var pagePathname = getPagePathname(page);
    return _react["default"].createElement(Fragment, null, devFiles ? devFiles.map(function (file) {
      return _react["default"].createElement("script", {
        key: file,
        src: assetPrefix + "/_next/" + file,
        nonce: _this6.props.nonce
      });
    }) : null, staticMarkup ? null : _react["default"].createElement("script", {
      nonce: this.props.nonce,
      dangerouslySetInnerHTML: {
        __html: NextScript.getInlineScriptSource(this.context._documentProps)
      }
    }), page !== '/_error' && _react["default"].createElement("script", {
      async: true,
      id: "__NEXT_PAGE__" + page,
      src: assetPrefix + "/_next/static/" + buildId + "/pages" + pagePathname,
      nonce: this.props.nonce
    }), _react["default"].createElement("script", {
      async: true,
      id: "__NEXT_PAGE__/_app",
      src: assetPrefix + "/_next/static/" + buildId + "/pages/_app.js",
      nonce: this.props.nonce
    }), _react["default"].createElement("script", {
      async: true,
      id: "__NEXT_PAGE__/_error",
      src: assetPrefix + "/_next/static/" + buildId + "/pages/_error.js",
      nonce: this.props.nonce
    }), staticMarkup ? null : this.getDynamicChunks(), staticMarkup ? null : this.getScripts());
  };

  return NextScript;
}(_react.Component);

exports.NextScript = NextScript;
(0, _defineProperty2["default"])(NextScript, "contextTypes", {
  _documentProps: _propTypes["default"].any
});
(0, _defineProperty2["default"])(NextScript, "propTypes", {
  nonce: _propTypes["default"].string
});

function getPagePathname(page) {
  if (page === '/') {
    return '/index.js';
  }

  return page + ".js";
}