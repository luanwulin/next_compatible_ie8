"use strict";

<<<<<<< HEAD
exports.__esModule = true;
=======
Object.defineProperty(exports, "__esModule", {
  value: true
});
>>>>>>> parent of b9f85a6... 又兼容了一把

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

<<<<<<< HEAD
=======
var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

>>>>>>> parent of b9f85a6... 又兼容了一把
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = function () {
  function EventEmitter() {
    (0, _classCallCheck3.default)(this, EventEmitter);
    this.listeners = {};
  }

<<<<<<< HEAD
  EventEmitter.prototype.on = function on(event, cb) {
    if (!this.listeners[event]) {
      this.listeners[event] = new _set2.default();
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
    this.listeners[event].delete(cb);
  };

=======
  (0, _createClass3.default)(EventEmitter, [{
    key: "on",
    value: function on(event, cb) {
      if (!this.listeners[event]) {
        this.listeners[event] = new _set2.default();
      }

      if (this.listeners[event].has(cb)) {
        throw new Error("The listener already exising in event: " + event);
      }

      this.listeners[event].add(cb);
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      if (!this.listeners[event]) return;
      this.listeners[event].forEach(function (cb) {
        return cb.apply(undefined, data);
      });
    }
  }, {
    key: "off",
    value: function off(event, cb) {
      this.listeners[event].delete(cb);
    }
  }]);
>>>>>>> parent of b9f85a6... 又兼容了一把
  return EventEmitter;
}();

exports.default = EventEmitter;