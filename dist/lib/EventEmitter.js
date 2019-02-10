"use strict";

exports.__esModule = true;

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EventEmitter = function () {
  function EventEmitter() {
    (0, _classCallCheck3["default"])(this, EventEmitter);
    this.listeners = {};
  }

  EventEmitter.prototype.on = function on(event, cb) {
    if (!this.listeners[event]) {
      this.listeners[event] = new _set2["default"]();
    }

    if (this.listeners[event].has(cb)) {
      throw new Error("The listener already exising in event: " + event);
    }

    this.listeners[event].add(cb);
  };

  EventEmitter.prototype.emit = function emit(event) {
    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    if (!this.listeners[event]) return;
    this.listeners[event].forEach(function (cb) {
      return cb.apply(undefined, data);
    });
  };

  EventEmitter.prototype.off = function off(event, cb) {
    this.listeners[event]["delete"](cb);
  };

  return EventEmitter;
}();

exports["default"] = EventEmitter;