"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports._rewriteUrlForNextExport = _rewriteUrlForNextExport;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.Router = exports.createRouter = exports.withRouter = exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _construct2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/construct"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _router = _interopRequireDefault(require("./router"));

var _utils = require("../utils");

var _withRouter = _interopRequireDefault(require("./with-router"));

exports.withRouter = _withRouter["default"];

/* global window */
var SingletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],
  ready: function ready(cb) {
    if (this.router) return cb();

    if (typeof window !== 'undefined') {
      this.readyCallbacks.push(cb);
    }
  }
}; // Create public properties and methods of the router in the SingletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath'];
var propertyFields = ['components'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(SingletonRouter, 'events', {
  get: function get() {
    return _router["default"].events;
  }
});
propertyFields.concat(urlPropertyFields).forEach(function (field) {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  (0, _defineProperty["default"])(SingletonRouter, field, {
    get: function get() {
      throwIfNoRouter();
      return SingletonRouter.router[field];
    }
  });
});
coreMethodFields.forEach(function (field) {
  SingletonRouter[field] = function () {
    var _SingletonRouter$rout;

    throwIfNoRouter();
    return (_SingletonRouter$rout = SingletonRouter.router)[field].apply(_SingletonRouter$rout, arguments);
  };
});
routerEvents.forEach(function (event) {
  SingletonRouter.ready(function () {
    _router["default"].events.on(event, function () {
      var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);

      if (SingletonRouter[eventField]) {
        try {
          SingletonRouter[eventField].apply(SingletonRouter, arguments);
        } catch (err) {
          console.error("Error when running the Router event: " + eventField);
          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});
var warnAboutRouterOnAppUpdated = (0, _utils.execOnce)(function () {
  console.warn("Router.onAppUpdated is removed - visit https://err.sh/zeit/next.js/no-on-app-updated-hook for more information.");
});
Object.defineProperty(SingletonRouter, 'onAppUpdated', {
  get: function get() {
    return null;
  },
  set: function set() {
    warnAboutRouterOnAppUpdated();
    return null;
  }
});

function throwIfNoRouter() {
  if (!SingletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }
} // Export the SingletonRouter and this is the public API.


var _default = SingletonRouter; // Reexport the withRoute HOC

exports["default"] = _default;

// INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.
var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  SingletonRouter.router = (0, _construct2["default"])(_router["default"], args);
  SingletonRouter.readyCallbacks.forEach(function (cb) {
    return cb();
  });
  SingletonRouter.readyCallbacks = [];
  return SingletonRouter.router;
}; // Export the actual Router class, which is usually used inside the server


exports.createRouter = createRouter;
var Router = _router["default"];
exports.Router = Router;

function _rewriteUrlForNextExport(url) {
  var _url$split = url.split('#'),
      hash = _url$split[1];

  url = url.replace(/#.*/, '');

  var _url$split2 = url.split('?'),
      path = _url$split2[0],
      qs = _url$split2[1];

  path = path.replace(/\/$/, '');
  var newPath = path; // Append a trailing slash if this path does not have an extension

  if (!/\.[^/]+\/?$/.test(path)) {
    newPath = path + "/";
  }

  if (qs) {
    newPath = newPath + "?" + qs;
  }

  if (hash) {
    newPath = newPath + "#" + hash;
  }

  return newPath;
} // This function is used to create the `withRouter` router instance


function makePublicRouterInstance(router) {
  var instance = {};

  for (var _i = 0; _i < urlPropertyFields.length; _i++) {
    var property = urlPropertyFields[_i];

    if (typeof router[property] === 'object') {
      instance[property] = (0, _objectSpread2["default"])({}, router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router["default"].events;
  propertyFields.forEach(function (field) {
    // Here we need to use Object.defineProperty because, we need to return
    // the property assigned to the actual router
    // The value might get changed as we change routes and this is the
    // proper way to access it
    (0, _defineProperty["default"])(instance, field, {
      get: function get() {
        return router[field];
      }
    });
  });
  coreMethodFields.forEach(function (field) {
    instance[field] = function () {
      return router[field].apply(router, arguments);
    };
  });
  return instance;
}