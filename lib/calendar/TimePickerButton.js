'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports["default"] = TimePickerButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TimePickerButton(_ref) {
  var _classnames;

  var prefixCls = _ref.prefixCls;
  var locale = _ref.locale;
  var showTimePicker = _ref.showTimePicker;
  var onOpenTimePicker = _ref.onOpenTimePicker;
  var onCloseTimePicker = _ref.onCloseTimePicker;
  var timePickerDisabled = _ref.timePickerDisabled;

  var className = (0, _classnames3["default"])((_classnames = {}, (0, _defineProperty3["default"])(_classnames, prefixCls + '-time-picker-btn', true), (0, _defineProperty3["default"])(_classnames, prefixCls + '-time-picker-btn-disabled', timePickerDisabled), _classnames));
  var onClick = null;
  if (!timePickerDisabled) {
    onClick = showTimePicker ? onCloseTimePicker : onOpenTimePicker;
  }
  return _react2["default"].createElement(
    'a',
    {
      className: className,
      role: 'button',
      onClick: onClick
    },
    showTimePicker ? locale.dateSelect : locale.timeSelect
  );
}
module.exports = exports['default'];