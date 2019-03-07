"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

// based on https://github.com/sindresorhus/p-queue (MIT)
// modified for browser support
var Queue =
/*#__PURE__*/
function () {
  function Queue() {
    this._queue = [];
  }

  var _proto = Queue.prototype;

  _proto.enqueue = function enqueue(run) {
    this._queue.push(run);
  };

  _proto.dequeue = function dequeue() {
    return this._queue.shift();
  };

  (0, _createClass2["default"])(Queue, [{
    key: "size",
    get: function get() {
      return this._queue.length;
    }
  }]);
  return Queue;
}();

var PQueue =
/*#__PURE__*/
function () {
  function PQueue(opts) {
    opts = (0, _assign["default"])({
      concurrency: Infinity,
      queueClass: Queue
    }, opts);

    if (opts.concurrency < 1) {
      throw new TypeError('Expected `concurrency` to be a number from 1 and up');
    }

    this.queue = new opts.queueClass(); // eslint-disable-line new-cap

    this._pendingCount = 0;
    this._concurrency = opts.concurrency;

    this._resolveEmpty = function () {};
  }

  var _proto2 = PQueue.prototype;

  _proto2._next = function _next() {
    this._pendingCount--;

    if (this.queue.size > 0) {
      this.queue.dequeue()();
    } else {
      this._resolveEmpty();
    }
  };

  _proto2.add = function add(fn, opts) {
    var _this = this;

    return new _promise["default"](function (resolve, reject) {
      var run = function run() {
        _this._pendingCount++;
        fn().then(function (val) {
          resolve(val);

          _this._next();
        }, function (err) {
          reject(err);

          _this._next();
        });
      };

      if (_this._pendingCount < _this._concurrency) {
        run();
      } else {
        _this.queue.enqueue(run, opts);
      }
    });
  };

  _proto2.onEmpty = function onEmpty() {
    var _this2 = this;

    return new _promise["default"](function (resolve) {
      var existingResolve = _this2._resolveEmpty;

      _this2._resolveEmpty = function () {
        existingResolve();
        resolve();
      };
    });
  };

  (0, _createClass2["default"])(PQueue, [{
    key: "size",
    get: function get() {
      return this.queue.size;
    }
  }, {
    key: "pending",
    get: function get() {
      return this._pendingCount;
    }
  }]);
  return PQueue;
}();

exports["default"] = PQueue;