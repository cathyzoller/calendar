"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleDayCheckbox = _react2.default.createClass({
  displayName: "SingleDayCheckbox",

  propTypes: {
    prefixCls: _react.PropTypes.string,
    singleDay: _react.PropTypes.bool,
    onSingleDayToggle: _react.PropTypes.func
  },

  render: function render() {
    var _this = this;

    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement("input", { type: "checkbox",
        className: this.props.prefixCls + "-single-day-checkbox",
        role: "checkbox",
        checked: this.props.singleDay,
        onChange: function onChange() {
          _this.props.onSingleDayToggle();
        }
      }),
      _react2.default.createElement(
        "label",
        { className: this.props.prefixCls + "-single-day-checkbox-label" },
        "Single-day Event"
      )
    );
  }
});

exports["default"] = SingleDayCheckbox;
module.exports = exports['default'];
