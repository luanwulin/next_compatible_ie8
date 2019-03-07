"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    (0, _defineProperty2["default"])(this, "listeners", {});
  }

  var _proto = EventEmitter.prototype;

  _proto.on = function on(event, cb) {
    if (!this.listeners[event]) {
      this.listeners[event] = new _set["default"]();
    }

    if (this.listeners[event].has(cb)) {
      throw new Error("The listener already exising in event: " + event);
    }

    this.listeners[event].add(cb);
    return this;
  };

  _proto.emit = function emit(event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    var listeners = this.listeners[event];
    var hasListeners = listeners && listeners.size;

    if (!hasListeners) {
      return false;
    }

    listeners.forEach(function (cb) {
      return cb.apply(void 0, data);
    }); // eslint-disable-line standard/no-callback-literal

    return true;
  };

  _proto.off = function off(event, cb) {
    this.listeners[event]["delete"](cb);
    return this;
  };

  return EventEmitter;
}();

exports["default"] = EventEmitter;