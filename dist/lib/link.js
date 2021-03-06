'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _url = require('url');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypesExact = require('prop-types-exact');

var _propTypesExact2 = _interopRequireDefault(_propTypesExact);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* global __NEXT_DATA__ */

var Link = function (_Component) {
  (0, _inherits3['default'])(Link, _Component);

  function Link(props) {
    (0, _classCallCheck3['default'])(this, Link);

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3['default'])(this, _Component.call.apply(_Component, [this, props].concat(rest)));

    _this.linkClicked = _this.linkClicked.bind(_this);
    _this.formatUrls(props);
    return _this;
  }

  Link.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.formatUrls(nextProps);
  };

  Link.prototype.linkClicked = function linkClicked(e) {
    var _this2 = this;

    if (e.currentTarget.nodeName === 'A' && (e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
      // ignore click for new tab / new window behavior
      return;
    }

    var shallow = this.props.shallow;
    var href = this.href,
        as = this.as;

    var baseRoute = _router2['default'].router ? _router2['default'].router.baseRoute : '';

    if (!isLocal(href)) {
      // ignore click if it's outside our scope
      return;
    }

    var pathname = window.location.pathname;


    if (baseRoute) {
      href = href.replace(baseRoute, '');
      pathname = pathname.replace(baseRoute, '');
    }

    href = (0, _url.resolve)(pathname, href);
    as = as ? (0, _url.resolve)(pathname, as) : href;

    e.preventDefault();

    //  avoid scroll for urls with anchor refs
    var scroll = this.props.scroll;

    if (scroll == null) {
      scroll = as.indexOf('#') < 0;
    }

    // replace state instead of push if prop is present
    var replace = this.props.replace;

    var changeMethod = replace ? 'replace' : 'push';

    // straight up redirect
    _router2['default'][changeMethod](href, as, { shallow: shallow }).then(function (success) {
      if (!success) return;
      if (scroll) window.scrollTo(0, 0);
    })['catch'](function (err) {
      if (_this2.props.onError) _this2.props.onError(err);
    });
  };

  Link.prototype.prefetch = function prefetch() {
    if (!this.props.prefetch) return;
    if (typeof window === 'undefined') return;

    // Prefetch the JSON page if asked (only in the client)
    var pathname = window.location.pathname;

    var href = (0, _url.resolve)(pathname, this.href);
    _router2['default'].prefetch(href);
  };

  Link.prototype.componentDidMount = function componentDidMount() {
    this.prefetch();
  };

  Link.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if ((0, _stringify2['default'])(this.props.href) !== (0, _stringify2['default'])(prevProps.href)) {
      this.prefetch();
    }
  };

  // We accept both 'href' and 'as' as objects which we can pass to `url.format`.
  // We'll handle it here.


  Link.prototype.formatUrls = function formatUrls(props) {
    this.href = props.href && (0, _typeof3['default'])(props.href) === 'object' ? (0, _url.format)(props.href) : props.href;
    this.as = props.as && (0, _typeof3['default'])(props.as) === 'object' ? (0, _url.format)(props.as) : props.as;
  };

  Link.prototype.render = function render() {
    var children = this.props.children;
    var href = this.href,
        as = this.as;

    var baseRoute = _router2['default'].router ? _router2['default'].router.baseRoute : '';

    // Deprecated. Warning shown by propType check. If the childen provided is a string (<Link>example</Link>) we wrap it in an <a> tag
    if (typeof children === 'string') {
      children = _react2['default'].createElement(
        'a',
        null,
        children
      );
    }

    // This will return the first child, if multiple are provided it will throw an error
    var child = _react.Children.only(children);
    var props = {
      onClick: this.linkClicked

      // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
      // defined, we specify the current 'href', so that repetition is not needed by the user
    };if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    }

    if (props.href && baseRoute) {
      props.href = (baseRoute + props.href).replace(/([^\:])\/{2,}/g, '$1/');
    }

    // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.
    if (props.href && typeof __NEXT_DATA__ !== 'undefined' && __NEXT_DATA__.nextExport) {
      props.href = (0, _router._rewriteUrlForNextExport)(props.href);
    }

    return _react2['default'].cloneElement(child, props);
  };

  return Link;
}(_react.Component);

Link.propTypes = (0, _propTypesExact2['default'])({
  href: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]).isRequired,
  as: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
  prefetch: _propTypes2['default'].bool,
  replace: _propTypes2['default'].bool,
  shallow: _propTypes2['default'].bool,
  passHref: _propTypes2['default'].bool,
  scroll: _propTypes2['default'].bool,
  children: _propTypes2['default'].oneOfType([_propTypes2['default'].element, function (props, propName) {
    var value = props[propName];

    if (typeof value === 'string') {
      warnLink('Warning: You\'re using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>');
    }

    return null;
  }]).isRequired
});
exports['default'] = Link;


function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

var warnLink = (0, _utils.execOnce)(_utils.warn);