"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = withSideEffect;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

var _set = _interopRequireDefault(require("./set"));

function withSideEffect(reduceComponentsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reduceComponentsToState !== 'function') {
    throw new Error('Expected reduceComponentsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = new _set["default"]();
    var state;

    function emitChange(component) {
      state = reduceComponentsToState([].concat(mountedInstances));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient.call(component, state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect =
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2["default"])(SideEffect, _Component);

      // Expose canUseDOM so tests can monkeypatch it
      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances.clear();
        return recordedState;
      };

      function SideEffect(props) {
        var _this;

        _this = _Component.call(this, props) || this;

        if (!SideEffect.canUseDOM) {
          mountedInstances.add((0, _assertThisInitialized2["default"])(_this));
          emitChange((0, _assertThisInitialized2["default"])(_this));
        }

        return _this;
      }

      var _proto = SideEffect.prototype;

      _proto.componentDidMount = function componentDidMount() {
        mountedInstances.add(this);
        emitChange(this);
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange(this);
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        mountedInstances["delete"](this);
        emitChange(this);
      };

      _proto.render = function render() {
        return _react["default"].createElement(WrappedComponent, null, this.props.children);
      };

      return SideEffect;
    }(_react.Component);

    (0, _defineProperty2["default"])(SideEffect, "canUseDOM", typeof window !== 'undefined');
    (0, _defineProperty2["default"])(SideEffect, "contextTypes", WrappedComponent.contextTypes);
    (0, _defineProperty2["default"])(SideEffect, "displayName", "SideEffect(" + (0, _utils.getDisplayName)(WrappedComponent) + ")");
    return SideEffect;
  };
}